import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { MedusaError } from "@medusajs/utils";
import zod from "zod";
import { claimDeliveryWorkflow } from "../../../../../workflows/delivery/workflows";

const schema = zod.object({
  driver_id: zod.string(),
});

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const validatedBody = schema.parse(req.body);
  const deliveryId = req.params.id;

  if (!validatedBody.driver_id) {
    return MedusaError.Types.INVALID_DATA;
  }

  const claimedDelivery = await claimDeliveryWorkflow(req.scope).run({
    input: {
      driver_id: validatedBody.driver_id,
      delivery_id: deliveryId,
    },
  });

  return res.status(200).json({ delivery: claimedDelivery });
}
