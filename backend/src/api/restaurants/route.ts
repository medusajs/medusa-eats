import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import RestaurantModuleService from "src/modules/restaurant/service"
import zod from "zod"

const schema = zod.object({
  name: zod.string(),
  address: zod.string(),
  phone: zod.string(),
  email: zod.string(),
  image: zod.instanceof(Buffer).optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant data" })
  }

  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  try {
    const restaurant =
      await restaurantModuleService.createRestaurant(validatedBody)

    return res.status(200).json({ restaurant })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )

  try {
    const restaurants = await restaurantModuleService.listRestaurants()

    return res.status(200).json({ restaurants })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
