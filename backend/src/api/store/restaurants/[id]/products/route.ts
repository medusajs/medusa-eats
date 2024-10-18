import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/utils";
import { deleteProductsWorkflow } from "@medusajs/core-flows";
import { createRestaurantProductsWorkflow } from "../../../../../workflows/restaurant/workflows";
import { AdminCreateProduct } from "@medusajs/types";
import { z } from "zod";

const createSchema = z.object({
  products: z.array(z.custom<AdminCreateProduct>()),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = createSchema.parse(req.body);

  const { result: restaurantProducts } = await createRestaurantProductsWorkflow(
    req.scope
  ).run({
    input: {
      products: validatedBody.products as any[],
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

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const restaurantProductsQuery = {
    entity: "product",
    filters: {
      restaurant: restaurantId,
    },
    fields: [
      "id",
      "title",
      "description",
      "thumbnail",
      "categories.*",
      "categories.id",
      "categories.name",
      "variants.*",
      "variants.id",
      "variants.price_set.*",
      "variants.price_set.id",
      "restaurant.*",
    ],
  };

  const { data: restaurantProducts } = await query.graph(
    restaurantProductsQuery
  );

  return res.status(200).json({ restaurant_products: restaurantProducts });
}

const deleteSchema = z.object({
  product_ids: z.string().array(),
});

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = deleteSchema.parse(req.body);

  await deleteProductsWorkflow(req.scope).run({
    input: {
      ids: validatedBody.product_ids,
    },
  });

  return res.status(200).json({ success: true });
}
