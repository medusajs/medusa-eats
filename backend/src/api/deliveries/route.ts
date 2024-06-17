import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { remoteQueryObjectFromString, MedusaError } from "@medusajs/utils";
import zod from "zod";
import { DeliveryItemDTO } from "../../types/delivery/common";
import { handleDeliveryWorkflow } from "../../workflows/workflows/handle-delivery";

const schema = zod.object({
  cart_id: zod.string().startsWith("cart_"),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  console.log("POST /api/deliveries");
  console.log(JSON.stringify(req.body));

  const validatedBody = schema.parse(req.body);

  console.log({ validatedBody });

  try {
    const { result } = await handleDeliveryWorkflow(req.scope).run({
      input: {
        cart_id: validatedBody.cart_id,
      },
    });

    console.log({ result });

    return res.status(200).json({ delivery: result });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const remoteQuery = req.scope.resolve("remoteQuery");

  const filter = {};
  let take = parseInt(req.query.take as string) || null;
  let skip = parseInt(req.query.skip as string) || 0;

  for (const key in req.query) {
    if (["take", "skip"].includes(key)) continue;

    filter[key] = req.query[key];
  }

  try {
    const deliveryQuery = remoteQueryObjectFromString({
      entryPoint: "deliveries",
      fields: ["*"],
      variables: {
        filter: JSON.stringify(filter),
        take,
        skip,
      },
    });

    const { rows: deliveries } = await remoteQuery(deliveryQuery);

    if (filter.hasOwnProperty("driver_id")) {
      const driverQuery = remoteQueryObjectFromString({
        entryPoint: "deliveryDrivers",
        fields: ["driver_id", "delivery_id"],
        variables: {
          filters: {
            driver_id: filter["driver_id"],
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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
