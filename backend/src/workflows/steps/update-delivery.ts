import { createStep, StepResponse } from "@medusajs/workflows-sdk";
import { IDeliveryModuleService } from "src/types/delivery/common";
import { UpdateDeliveryDTO } from "src/types/delivery/mutations";
import { IProductModuleService } from "@medusajs/types";

type UpdateDeliveryStepInput = {
  data: UpdateDeliveryDTO;
};

export const updateDeliveryStepId = "update-delivery-step";
export const updateDeliveryStep = createStep(
  updateDeliveryStepId,
  async function (input: UpdateDeliveryStepInput, { container }) {
    const deliveryService = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    const delivery = await deliveryService
      .update([input.data])
      .then((res) => res[0])
      .catch((error) => {
        console.log("Failed to update delivery", error);
        throw error;
      });

    console.log("Updated delivery", delivery);

    return new StepResponse(delivery, delivery.id);
  }
);
