import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import zod from "zod"
import AccountModuleService from "../../../modules/account/service"

const schema = zod
  .object({
    name: zod.string(),
    billing_email: zod.string().email().optional(),
  })
  .required({ name: true })

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const validatedBody = schema.parse(req.body)

  const service = req.scope.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const user = await service.retrieveUser(req.auth.app_metadata.euser_id)

  const account = await service.create({
    name: validatedBody.name,
    billing_email: validatedBody.billing_email || user.email,
  })

  await service.createAccountUser({
    account_id: account.id,
    user_id: user.id,
    role: "owner",
  })

  res.status(200).json({ account })
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const userId = req.auth.app_metadata.euser_id
  const service = req.scope.resolve<AccountModuleService>(
    "accountModuleService"
  )

  const [accounts, count] = await service.listAndCount({
    users: { id: userId },
  })

  res.status(200).json({ accounts, count })
}
