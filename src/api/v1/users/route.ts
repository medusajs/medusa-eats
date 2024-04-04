import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IAuthModuleService } from "@medusajs/types"
import zod from "zod"
import jwt from "jsonwebtoken"

import { createEuserWorkflow } from "../../../workflows/account/create-euser"

const schema = zod
  .object({
    email: zod.string().email(),
    first_name: zod.string().optional(),
    last_name: zod.string().optional(),
  })
  .required({ email: true })

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const authUserId = req.auth.auth_user_id

  const validatedBody = schema.parse(req.body)

  const { result, errors } = await createEuserWorkflow(req.scope).run({
    input: {
      user: validatedBody,
      auth_user_id: authUserId,
    },
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  const authService = req.scope.resolve<IAuthModuleService>(
    ModuleRegistrationName.AUTH
  )

  const authUser = await authService.retrieve(authUserId)
  const { jwt_secret } = req.scope.resolve("configModule").projectConfig
  const token = jwt.sign(authUser, jwt_secret)

  res.status(201).json({ user: result, token })
}
