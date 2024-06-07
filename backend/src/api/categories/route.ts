import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa/dist/types/routing";
import { IProductModuleService } from "@medusajs/types";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productService = req.scope.resolve<IProductModuleService>(
    "productModuleService"
  );

  const categories = await productService.listCategories(
    {},
    {
      take: 1000,
      select: ["id", "name"],
    }
  );

  res.status(200).json({ categories });
}
