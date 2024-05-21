import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { ProductModuleService } from "@medusajs/product"
import { PricingModuleService } from "@medusajs/pricing"
import RestaurantModuleService from "../../../modules/restaurant/service"
import { getPricesByPriceSetId } from "../../../utils/get-prices-by-price-set-id"
import { MedusaApp, Modules } from "@medusajs/modules-sdk"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantModuleService = req.scope.resolve<RestaurantModuleService>(
    "restaurantModuleService"
  )
  const productModuleService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  const pricingModuleService = req.scope.resolve<PricingModuleService>(
    "pricingModuleService"
  )

  const restaurantId = req.params.id

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
    const restaurant =
      await restaurantModuleService.retrieveRestaurant(restaurantId)

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
            }
          }
        }`

    const products = await query(productsQuery, filters)

    const pricedProducts = await getPricesByPriceSetId({
      products,
      currency_code: "usd",
      pricingService: pricingModuleService,
    })

    restaurant.products = pricedProducts

    return res.status(200).json({ restaurant })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ message: error.message })
  }
}
