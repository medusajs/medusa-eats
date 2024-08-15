import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { RemoteQuery } from "@medusajs/modules-sdk";
import {
  ContainerRegistrationKeys,
  MedusaError,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import zod from "zod";
import {
  createRestaurantProductsWorkflow,
  deleteRestaurantProductsWorkflow,
} from "../../../../workflows/restaurant/workflows";

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

  const remoteQuery: RemoteQuery = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY
  );

  const restaurantProductsQuery = remoteQueryObjectFromString({
    entryPoint: "products",
    // variables: {
    //   filters: {
    //     restaurant: restaurantId,
    //   },
    // },
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
      "restaurant.*",
    ],
  });

  const restaurantProducts = await remoteQuery(restaurantProductsQuery);

  return res.status(200).json({ restaurant_products: restaurantProducts });
}

const deleteSchema = zod.object({
  product_ids: zod.string().array(),
});

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = deleteSchema.parse(req.body);

  await deleteRestaurantProductsWorkflow(req.scope).run({
    input: {
      product_ids: validatedBody.product_ids,
      restaurant_id: req.params.id,
    },
  });

  return res.status(200);
}
