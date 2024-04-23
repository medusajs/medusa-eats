import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import RestaurantModuleService from "../../../../modules/restaurant/service"
import zod from "zod"

const schema = zod.object({
  email: zod.string(),
  first_name: zod.string(),
  last_name: zod.string(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant admin data" })
  }

  const restaurantId = req.params.id

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" })
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  try {
    const restaurantAdmin = await restaurantModuleService.createRestaurantAdmin(
      restaurantId,
      validatedBody
    )

    return res.status(200).json({ restaurant_admin: restaurantAdmin })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
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
