import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ProductModuleService } from "@medusajs/product"
import RestaurantModuleService from "src/modules/restaurant/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )
  const productModuleService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  const restaurantId = req.params.id

  try {
    const restaurant =
      await restaurantModuleService.retrieveRestaurant(restaurantId)

    const restaurantProducts =
      await restaurantModuleService.listRestaurantProducts({
        restaurant_id: restaurantId,
      })

    if (restaurantProducts.length) {
      const products = await productModuleService.list(
        {
          id: restaurantProducts.map((rp) => rp.product_id),
        },
        {
          relations: ["variants", "options", "categories"],
        }
      )

      restaurant.products = products
    }

    return res.status(200).json({ restaurant })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
