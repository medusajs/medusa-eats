import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import zod from "zod";
import { DeliveryStatus } from "../../../../modules/delivery/types/common";
import { UpdateDeliveryDTO } from "../../../../modules/delivery/types/mutations";
import { updateDeliveryWorkflow } from "../../../../workflows/delivery/workflows";

const schema = zod.object({
  driver_id: zod.string().optional(),
  notified_driver_ids: zod.array(zod.string()).optional(),
  order_id: zod.string().optional(),
  delivery_status: zod.nativeEnum(DeliveryStatus).optional(),
  eta: zod.date().optional(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  const deliveryId = req.params.id;

  const updateData: UpdateDeliveryDTO = {
    id: deliveryId,
    ...validatedBody,
  };

  if (validatedBody.delivery_status === "delivered") {
    updateData.delivered_at = new Date();
  }

  try {
    const delivery = await updateDeliveryWorkflow(req.scope).run({
      input: {
        data: updateData,
      },
    });

    return res.status(200).json({ delivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const deliveryId = req.params.id;

  const remoteQuery = req.scope.resolve("remoteQuery");

  const deliveryQuery = remoteQueryObjectFromString({
    entryPoint: "deliveries",
    fields: [
      "*",
      "cart.*",
      "cart.items.*",
      "order.*",
      "order.items.*",
      "restaurant.*",
    ],
    variables: {
      filters: {
        id: deliveryId,
      },
    },
  });

  const delivery = await remoteQuery(deliveryQuery).then((r) => r[0]);

  if (!delivery) {
    return res.status(404).json({ message: "Delivery not found" });
  }

  try {
    return res.status(200).json({ delivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
