import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { getPricesByPriceSetId } from "../../../utils/get-prices-by-price-set-id";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  const restaurantId = req.params.id;

  const restaurantQuery = remoteQueryObjectFromString({
    entryPoint: "restaurants",
    fields: [
      "id",
      "handle",
      "name",
      "address",
      "phone",
      "email",
      "image_url",
      "is_open",
    ],
    variables: {
      filters: {
        id: restaurantId,
      },
    },
  });

  const restaurant = await remoteQuery(restaurantQuery).then((r) => r[0]);

  const restaurantProductsQuery = remoteQueryObjectFromString({
    entryPoint: "restaurantProducts",
    fields: ["product_id"],
    variables: {
      filters: {
        restaurant_id: restaurantId,
      },
    },
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
      "categories.handle",
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

  const pricedProducts = await getPricesByPriceSetId({
    products,
    currency_code: "usd",
    pricingService: req.scope.resolve("pricingModuleService"),
  });

  restaurant.products = pricedProducts;

  return res.status(200).json({ restaurant });
}
