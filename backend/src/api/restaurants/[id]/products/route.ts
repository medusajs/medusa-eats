import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ProductModuleService } from "@medusajs/product"
import { CreateProductDTO, ProductDTO } from "@medusajs/types"
import RestaurantModuleService from "src/modules/restaurant/service"
import zod from "zod"

const schema = zod.object({
  title: zod.string(),
  description: zod.string().optional(),
  category_id: zod.string(),
  price: zod.string().optional(),
  sku: zod.string().optional(),
  thumbnail: zod.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = JSON.parse(req.body)
  const validatedBody = schema.parse(parsedBody)

  console.log("validatedBody", validatedBody)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant admin data" })
  }

  const productData = {
    categories: [
      {
        id: validatedBody.category_id,
      },
    ],
    ...validatedBody,
  } as Record<string, any>

  delete productData.price
  delete productData.category_id

  console.log("parsedProductData", productData)

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
    const product = await productModuleService.create(
      productData as CreateProductDTO[]
    )

    console.log("product", product)

    const restaurantProduct =
      await restaurantModuleService.addProductToRestaurant({
        restaurant_id: restaurantId,
        product_id: product.id,
      })

    return res.status(200).json({ restaurant_product: restaurantProduct })
  } catch (error) {
    console.log("error", error)
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

const deleteSchema = zod.object({
  product_id: zod.string(),
})

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = deleteSchema.parse(req.body)

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
      await restaurantModuleService.removeProductFromRestaurant(
        restaurantId,
        validatedBody.product_id
      )

    return res.status(200)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
