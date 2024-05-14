import {
  MedusaRequest,
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa"
import RestaurantModuleService from "../../../../modules/restaurant/service"
import zod from "zod"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { IAuthModuleService } from "@medusajs/types"
import jwt from "jsonwebtoken"
import { createUserWorkflow } from "../../../../workflows/account/create-user"

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
  const restaurantId = req.params.id

  const validatedBody = schema.parse(req.body) as {
    email: string
    first_name?: string
    last_name?: string
  }

  const { result, errors } = await createUserWorkflow(req.scope).run({
    input: {
      user: {
        ...validatedBody,
        scope: "restaurant",
        restaurant_id: restaurantId,
      },
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

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" })
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  try {
    const restaurantAdmins = await restaurantModuleService.listRestaurantAdmins(
      {
        restaurant_id: restaurantId,
      }
    )

    return res.status(200).json({ restaurant_admins: restaurantAdmins })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id
  const adminId = req.params.adminId

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" })
  }

  if (!adminId) {
    return res.status(400).json({ message: "Missing admin id" })
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  try {
    await restaurantModuleService.deleteRestaurantAdmin(adminId)

    return res.status(200).json({ message: "Admin deleted" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
