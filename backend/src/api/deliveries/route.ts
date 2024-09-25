import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import zod from "zod";
import {
  createDeliveryWorkflow,
  handleDeliveryWorkflow,
} from "../../workflows/delivery/workflows";

const schema = zod.object({
  cart_id: zod.string().startsWith("cart_"),
  restaurant_id: zod.string().startsWith("res_"),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  const { result: delivery } = await createDeliveryWorkflow(req.scope).run({
    input: {
      cart_id: validatedBody.cart_id,
      restaurant_id: validatedBody.restaurant_id,
    },
  });

  const { transaction } = await handleDeliveryWorkflow(req.scope).run({
    input: {
      delivery_id: delivery.id,
    },
  });

  return res
    .status(200)
    .json({ message: "Delivery created", delivery, transaction });
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve("remoteQuery");

  const filters = {} as Record<string, any>;
  let take = parseInt(req.query.take as string) || null;
  let skip = parseInt(req.query.skip as string) || 0;

  for (const key in req.query) {
    if (["take", "skip"].includes(key)) continue;

    filters[key] = req.query[key];
  }
  const deliveryQuery = remoteQueryObjectFromString({
    entryPoint: "deliveries",
    fields: ["*", "cart.*", "cart.items.*", "order.*", "order.items.*"],
    variables: {
      filters,
      take,
      skip,
    },
  });

  const { rows: deliveries } = await remoteQuery(deliveryQuery);

  if (filters.hasOwnProperty("driver_id")) {
    const driverQuery = remoteQueryObjectFromString({
      entryPoint: "delivery_driver",
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
      fields: ["*", "cart.*", "cart.items.*", "order.*", "order.items.*"],
      variables: {
        filters: {
          id: availableDeliveriesIds.map((d) => d.delivery_id),
        },
      },
    });

    const availableDeliveries = await remoteQuery(availableDeliveriesQuery);

    deliveries.push(...availableDeliveries);
  }

  return res.status(200).json({ deliveries });
}
