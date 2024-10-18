import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QueryContext } from "@medusajs/framework/utils";
import { ContainerRegistrationKeys } from "@medusajs/utils";
import { query } from "express";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { currency_code = "eur", ...reqQuery } = req.query;

  const restaurantId = req.params.id;

  const restaurantQuery = {
    entity: "restaurant",
    fields: [
      "*",
      "products.*",
      "products.categories.*",
      "products.categories.*",
      "products.variants.*",
      "products.variants.calculated_price.*",
      "deliveries.*",
      "deliveries.cart.*",
      "deliveries.cart.items.*",
      "deliveries.order.*",
      "deliveries.order.items.*",
    ],
    filters: {
      id: restaurantId,
    },
    context: {
      products: {
        variants: {
          calculated_price: QueryContext({
            currency_code,
          }),
        },
      },
    },
  };

  const {
    data: [restaurant],
  } = await query.graph(restaurantQuery);

  return res.status(200).json({ restaurant });
}
