import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import RestaurantModuleService from "src/modules/restaurant/service"
import { MedusaApp, Modules, RemoteQuery } from "@medusajs/modules-sdk"
import zod from "zod"
import { getPricesByPriceSetId } from "../../utils/get-prices-by-price-set-id"
import { IPricingModuleService } from "@medusajs/types"

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

  const productModuleService = req.scope.resolve("productModuleService")

  const queryFilters = req.query

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
    const restaurants =
      await restaurantModuleService.listRestaurants(queryFilters)

    for (const restaurant of restaurants) {
      const restaurantProducts =
        await restaurantModuleService.listRestaurantProducts({
          restaurant_id: restaurant.id,
        })

      const filters = {
        context: {
          currency_code: "usd",
          region_id: "reg_01H9T2TK25TG2M26Q01EP62ZVP",
        },
      }

      restaurant.products = []

      if (restaurantProducts.length) {
        const productsQuery = `#graphql
        query($filters: Record, $id: String, $currency_code: String, $region_id: String) {
          products(filters: $filters) {
            id
            title
            description
            thumbnail
            categories {
              id
              name
            }
            variants {
              id
              price_set {
                id
                price
              }
          }
          }
        }
      `

        const products = await query(productsQuery, filters)

        console.log({
          products: JSON.stringify(products),
        })

        const productsWithPrices = await getPricesByPriceSetId({
          products,
          currency_code: "usd",
          pricingService:
            modules.pricingService as unknown as IPricingModuleService,
        })

        console.log({
          productsWithPrices: JSON.stringify(productsWithPrices),
        })

        restaurant.products = productsWithPrices
      }
    }

    return res.status(200).json({ restaurants })
  } catch (error) {
    console.log({ message: error.message })
    return res.status(500).json({ message: error.message })
  }
}
