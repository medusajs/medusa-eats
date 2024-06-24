import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import zod from "zod";
import { DeliveryItemDTO } from "../../types/delivery/common";
import { handleDeliveryWorkflow } from "../../workflows/delivery/workflows/handle-delivery";

const schema = zod.object({
  cart_id: zod.string().startsWith("cart_"),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  const { transaction } = await handleDeliveryWorkflow(req.scope).run({
    input: {
      cart_id: validatedBody.cart_id,
    },
  });

  return res.status(200).json({ message: "Delivery created", transaction });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve("remoteQuery");

  const filters = {};
  let take = parseInt(req.query.take as string) || null;
  let skip = parseInt(req.query.skip as string) || 0;

  for (const key in req.query) {
    if (["take", "skip"].includes(key)) continue;

    filters[key] = req.query[key];
  }

  const deliveryQuery = remoteQueryObjectFromString({
    entryPoint: "deliveries",
    fields: ["*"],
    variables: {
      filters,
      take,
      skip,
    },
  });

  const { rows: deliveries } = await remoteQuery(deliveryQuery);

  if (filters.hasOwnProperty("driver_id")) {
    const driverQuery = remoteQueryObjectFromString({
      entryPoint: "deliveryDrivers",
      fields: ["driver_id", "delivery_id"],
      variables: {
        filters: {
          deleted_at: null,
          driver_id: filters["driver_id"],
        },
      },
    });

    const availableDeliveriesIds = await remoteQuery(driverQuery);

    const availableDeliveriesQuery = remoteQueryObjectFromString({
      entryPoint: "deliveries",
      fields: ["*"],
      variables: {
        filters: {
          id: availableDeliveriesIds.map((d) => d.delivery_id),
        },
      },
    });

    const availableDeliveries = await remoteQuery(availableDeliveriesQuery);

    deliveries.push(...availableDeliveries);
  }

  for (const delivery of deliveries) {
    const items = [] as DeliveryItemDTO[];

    if (delivery.cart_id) {
      const cartQuery = remoteQueryObjectFromString({
        entryPoint: "carts",
        fields: ["id", "items.*"],
        variables: {
          filters: {
            id: delivery.cart_id,
          },
        },
      });

      const cart = await remoteQuery(cartQuery).then((res) => res[0]);

      items.push(...(cart.items as DeliveryItemDTO[]));
    }

    delivery.items = items;
  }

  return res.status(200).json({ deliveries });
}
