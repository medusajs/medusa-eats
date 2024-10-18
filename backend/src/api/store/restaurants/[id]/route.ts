import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/utils";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

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
    variables: {
      filters: {
        id: restaurantId,
      },
      "products.variants.calculated_price": {
        context: {
          currency_code: "eur",
        },
      },
    },
  };

  const {
    data: [restaurant],
  } = await query.graph(restaurantQuery);

  return res.status(200).json({ restaurant });
}
