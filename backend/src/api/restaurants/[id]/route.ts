import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { RemoteQueryFunction } from "@medusajs/modules-sdk";
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { getPricesByPriceSetId } from "../../../utils/get-prices-by-price-set-id";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery: RemoteQueryFunction = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY
  );

  const restaurantId = req.params.id;

  const restaurantQuery = remoteQueryObjectFromString({
    entryPoint: "restaurants",
    fields: ["*", "products.*", "products.categories.*"],
    variables: {
      filters: {
        id: restaurantId,
      },
    },
  });

  const restaurant = await remoteQuery(restaurantQuery).then((r) => r[0]);

  const pricedProducts = await getPricesByPriceSetId({
    products: restaurant.products,
    currency_code: "EUR",
    pricingService: req.scope.resolve("pricingModuleService"),
  });

  restaurant.products = pricedProducts;

  return res.status(200).json({ restaurant });
}
