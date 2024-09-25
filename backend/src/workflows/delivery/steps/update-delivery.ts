import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { UpdateDeliveryDTO } from "../../../modules/delivery/types/mutations";
import { DELIVERY_MODULE } from "../../../modules/delivery";

type UpdateDeliveryStepInput = {
  data: UpdateDeliveryDTO;
};

export const updateDeliveryStepId = "update-delivery-step";
export const updateDeliveryStep = createStep(
  updateDeliveryStepId,
  async function (input: UpdateDeliveryStepInput, { container }) {
    const deliveryService = container.resolve(DELIVERY_MODULE);

    const delivery = await deliveryService
      .updateDeliveries([input.data])
      .then((res) => res[0]);

    return new StepResponse(delivery, delivery.id);
  }
);
