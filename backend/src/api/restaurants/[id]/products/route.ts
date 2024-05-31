import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { MedusaApp, Modules } from "@medusajs/modules-sdk"
import { ProductModuleService } from "@medusajs/product"
import { CreateProductDTO, ProductDTO } from "@medusajs/types"
import zod from "zod"
import RestaurantModuleService from "../../../../modules/restaurant/service"
import { createVariantPriceSet } from "../../../../utils/create-variant-price-set"

const schema = zod.object({
  title: zod.string(),
  description: zod.string().optional(),
  category_id: zod.string(),
  price: zod.string(),
  sku: zod.string().optional(),
  thumbnail: zod.string().optional(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body)

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant admin data" })
  }

  const { price, category_id, ...rest } = validatedBody
  const productData = rest as CreateProductDTO

  const restaurantId = req.params.id

  // @ts-ignore
  productData.categories = [{ id: category_id }]

  productData.variants = [
    {
      title: validatedBody.title,
      manage_inventory: false,
    },
  ]

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
    // Create the product
    const product: ProductDTO = await productModuleService.create(
      productData as CreateProductDTO
    )

    // Create and link a price set to the product variant
    const priceSet = await createVariantPriceSet({
      container: req.scope,
      variantId: product.variants[0].id,
      prices: [
        {
          amount: price,
          currency_code: "usd",
        },
      ],
      rules: [],
    })

    // Add the product to the restaurant
    const restaurantProduct =
      await restaurantModuleService.addProductToRestaurant({
        restaurant_id: restaurantId,
        product_id: product.id,
      })

    // Return the product
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

  const { query } = await MedusaApp({
    modulesConfig: {
      [Modules.PRODUCT]: true,
      [Modules.PRICING]: true,
    },
    sharedResourcesConfig: {
      database: { clientUrl: process.env.POSTGRES_URL },
    },
    injectedDependencies: {},
  })

  try {
    const restaurantProducts =
      await restaurantModuleService.listRestaurantProducts({
        restaurant_id: restaurantId,
      })

    const filters = {
      context: {
        id: restaurantProducts.map((p) => p.product_id),
        currency_code: "usd",
      },
    }

    const productsQuery = `#graphql
        query($filters: Record, $id: [String], $currency_code: String, $region_id: String) {
          products(filters: $filters) {
            id
            title
            description
            thumbnail
            categories {
              id
              title
            }
            variants {
              id
              price_set {
                id
              }
              price {
                id
                amount
                currency_code
              }
            }
          }
        }`

    const products = await query(productsQuery, filters)

    return res.status(200).json({ restaurant_products: products })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteSchema = zod.object({
  product_id: zod.string(),
})

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = JSON.parse(req.body as string)
  const validatedBody = deleteSchema.parse(parsedBody)

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

  const productModuleService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  try {
    await productModuleService.delete(validatedBody.product_id)

    await restaurantModuleService.removeProductFromRestaurant(
      restaurantId,
      validatedBody.product_id
    )

    return res.status(200)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
