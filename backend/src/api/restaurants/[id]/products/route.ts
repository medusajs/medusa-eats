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
  const parsedBody = JSON.parse(req.body)
  const validatedBody = schema.parse(parsedBody)

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
    createVariantPriceSet({
      container: req.scope,
      variantId: product.variants[0].id,
      prices: [
        {
          amount: parseInt(price),
          currency_code: "usd",
          rules: {
            region_id: "reg_01H9T2TK25TG2M26Q01EP62ZVP",
          },
        },
      ],
      rules: [{ rule_attribute: "region_id" }],
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

  const productModuleService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  const { query, modules } = await MedusaApp({
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
        region_id: "reg_01H9T2TK25TG2M26Q01EP62ZVP",
      },
    }

    const productsQuery = `#graphql
        query($filters: Record, $id: String[], $currency_code: String, $region_id: String) {
          products(filters: $filters) {
            id
            title
            description
            thumbnail
            variants {
              id
              price_set {
                id
              }
          }
          }
        }
      `

    const products = await query(productsQuery, filters)

    console.log({ products })

    return res.status(200).json({ restaurant_products: products })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteSchema = zod.object({
  product_id: zod.string(),
})

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = JSON.parse(req.body)
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
