import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantModuleService = req.scope.resolve("restaurantModuleService")

  const restaurantId = req.params.id

  try {
    const restaurant =
      await restaurantModuleService.retrieveRestaurant(restaurantId)

    return res.status(200).json({ restaurant })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
