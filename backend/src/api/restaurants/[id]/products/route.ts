import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { IProductModuleService } from "@medusajs/types";
import {
  ContainerRegistrationKeys,
  MedusaError,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import zod from "zod";
import { IRestaurantModuleService } from "../../../../types/restaurant/common";
import { createRestaurantProductsWorkflow } from "../../../../workflows/restaurant/workflows";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { products } = JSON.parse(req.body as string);

  const { result: restaurantProducts } = await createRestaurantProductsWorkflow(
    req.scope
  ).run({
    input: {
      products,
      restaurant_id: req.params.id,
    },
  });

  // Return the product
  return res.status(200).json({ restaurant_products: restaurantProducts });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    return MedusaError.Types.NOT_FOUND;
  }

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  const restaurantProductsQuery = remoteQueryObjectFromString({
    entryPoint: "restaurant_product",
    variables: {
      filters: {
        restaurant_id: restaurantId,
      },
    },
    fields: ["restaurant_id", "product_id"],
  });

  const restaurantProducts = await remoteQuery(restaurantProductsQuery);

  const productsQuery = remoteQueryObjectFromString({
    entryPoint: "products",
    fields: [
      "id",
      "title",
      "description",
      "thumbnail",
      "categories",
      "categories.id",
      "categories.name",
      "variants",
      "variants.id",
      "variants.price_set",
      "variants.price_set.id",
    ],
    variables: {
      filters: {
        id: restaurantProducts.map((p) => p.product_id),
      },
    },
  });

  const products = await remoteQuery(productsQuery);

  return res.status(200).json({ restaurant_products: products });
}

const deleteSchema = zod.object({
  product_id: zod.string(),
});

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const parsedBody = JSON.parse(req.body as string);
  const validatedBody = deleteSchema.parse(parsedBody);

  if (!validatedBody) {
    return res.status(400).json({ message: "Missing restaurant admin data" });
  }

  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res.status(400).json({ message: "Missing restaurant id" });
  }

  const restaurantModuleService = req.scope.resolve<IRestaurantModuleService>(
    "restaurantModuleService"
  );

  const productModuleService = req.scope.resolve<IProductModuleService>(
    "productModuleService"
  );

  await productModuleService.deleteProducts([validatedBody.product_id]);

  await restaurantModuleService.deleteRestaurantProducts({
    restaurant_id: restaurantId,
    product_id: validatedBody.product_id,
  });

  return res.status(200);
}
