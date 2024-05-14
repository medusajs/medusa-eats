import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IAuthModuleService } from "@medusajs/types"
import zod from "zod"
import jwt from "jsonwebtoken"

import { createUserWorkflow } from "../../workflows/account/create-user"

const schema = zod
  .object({
    email: zod.string().email(),
    first_name: zod.string(),
    last_name: zod.string(),
    phone: zod.string(),
    avatar_url: zod.string().optional(),
    restaurant_id: zod.string().optional(),
    scope: zod.ZodEnum.create(["restaurant", "driver", "customer"]),
  })
  .required({
    email: true,
    first_name: true,
    last_name: true,
    phone: true,
    scope: true,
  })

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  console.log("POST /api/users")
  console.log(req.auth)
  const authUserId = req.auth.auth_user_id

  const validatedBody = schema.parse(req.body)

  const { result, errors } = await createUserWorkflow(req.scope).run({
    input: {
      user: validatedBody,
      auth_user_id: authUserId,
    },
    throwOnError: false,
  })

  console.log({ result, errors })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const authService = req.scope.resolve<IAuthModuleService>(
    ModuleRegistrationName.AUTH
  )

  const authUser = await authService.retrieve(authUserId)
  const { jwt_secret } = req.scope.resolve("configModule").projectConfig
  const token = jwt.sign(authUser, jwt_secret)

  console.log({ user: result, token })

  res.status(201).json({ user: result, token })
}
