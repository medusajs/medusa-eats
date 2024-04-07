import { ConfigModule, IAuthModuleService } from "@medusajs/types"
import { ContainerLike } from "@medusajs/modules-sdk"
import AccountModuleService from "../../src/modules/account/service"
import jwt from "jsonwebtoken"

type ConfigOptions = {
  user?: {
    email?: string
    first_name?: string
    last_name?: string
  }
  account?: {
    name?: string
    billing_email?: string
  }
}

export async function createAccountAndUser(
  container: ContainerLike,
  options: ConfigOptions = {}
) {
  const { jwt_secret } =
    container.resolve<ConfigModule>("configModule").projectConfig

  const auth = container.resolve<IAuthModuleService>("authModuleService")
  const service = container.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const user = await service.createUser({
    email: "test@test.com",
    ...(options.user ?? {}),
  })

  const authUser = await auth.create({
    provider: "emailpass",
    entity_id: "test@test.com",
    scope: "euser",
    app_metadata: {
      euser_id: user.id,
    },
  })

  const token = jwt.sign(authUser, jwt_secret ?? "")

  const account = await service.create({
    name: "test account",
    billing_email: "test@test.com",
    ...(options.account ?? {}),
  })

  await service.createAccountUser({
    account_id: account.id,
    user_id: user.id,
  })

  return {
    account,
    user,
    token,
    headers: {
      Authorization: `Bearer ${token}`,
      "x-medusa-account": account.id,
    },
  }
}
