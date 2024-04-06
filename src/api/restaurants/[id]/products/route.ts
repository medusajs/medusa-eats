import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ProductModuleService } from "@medusajs/product"
import RestaurantModuleService from "src/modules/restaurant/service"
import zod from "zod"

const schema = zod.object({
  product_id: zod.string(),
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
    const restaurantProduct =
      await restaurantModuleService.addProductToRestaurant({
        restaurant_id: restaurantId,
        product_id: validatedBody.product_id,
      })

    return res.status(200).json({ restaurant_product: restaurantProduct })
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

  const productModuleService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  try {
    const restaurantProducts = await restaurantModuleService
      .listRestaurantProducts({
        restaurant_id: restaurantId,
      })
      .then(async (products) => {
        return await Promise.all(
          products.map(async (product) => {
            const medusaProduct = await productModuleService.retrieve(
              product.product_id
            )
            return medusaProduct
          })
        )
      })

    return res.status(200).json({ restaurant_products: restaurantProducts })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
