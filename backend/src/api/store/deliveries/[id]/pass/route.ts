import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import zod from "zod";
import { passDeliveryWorkflow } from "../../../../../workflows/delivery/workflows";

const schema = zod.object({
  driver_id: zod.string(),
});

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);

  const deliveryId = req.params.id;

  await passDeliveryWorkflow(req.scope).run({
    input: {
      driver_id: validatedBody.driver_id,
      delivery_id: deliveryId,
    },
  });

  return res.status(200).json({ message: "Driver declined delivery" });
}
