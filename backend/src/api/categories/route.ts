import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa/dist/types/routing"
import { ProductModuleService } from "@medusajs/product"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productService = req.scope.resolve<ProductModuleService>(
    "productModuleService"
  )

  const categories = await productService.listCategories(
    {},
    {
      take: 1000,
      select: ["id", "name"],
    }
  )

  res.status(200).json({ categories })
}
