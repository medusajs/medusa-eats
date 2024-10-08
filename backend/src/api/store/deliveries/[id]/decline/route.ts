import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import { DeliveryStatus } from "../../../../../modules/delivery/types/common";
import { notifyRestaurantStepId } from "../../../../../workflows/delivery/steps";
import { updateDeliveryWorkflow } from "../../../../../workflows/delivery/workflows";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;

  const data = {
    id,
    delivery_status: DeliveryStatus.RESTAURANT_DECLINED,
  };

  const updatedDelivery = await updateDeliveryWorkflow(req.scope)
    .run({
      input: {
        data,
        stepIdToFail: notifyRestaurantStepId,
      },
    })
    .catch((error) => {
      return MedusaError.Types.UNEXPECTED_STATE;
    });

  return res.status(200).json({ delivery: updatedDelivery });
}
