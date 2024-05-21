import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import { MedusaApp, Modules } from "@medusajs/modules-sdk"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
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

  const productIds = req.query.ids || []

  const filters = {
    context: {
      id: productIds,
      currency_code: "usd",
    },
  }

  const productsQuery = `#graphql
    query MyQueryName($filters: Record, $id: [String]!, $currency_code: String, $region_id: String) {
    products(filters: $filters) {
        id
        thumbnail
    }
    }
    `

  const products = await query(productsQuery, filters)

  return res.status(200).json({ products })
}
