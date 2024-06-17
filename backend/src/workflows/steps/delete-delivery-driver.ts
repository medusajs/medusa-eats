import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { IDeliveryModuleService } from "../../types/delivery/common";

export type CreateDeliveryStepInput = {
  delivery_id: string;
};

export const deleteDeliveryDriversStepId = "delete-delivery-drivers-step";
export const deleteDeliveryDriversStep = createStep(
  deleteDeliveryDriversStepId,
  async function (input: CreateDeliveryStepInput, { container, context }) {
    const deliveryModuleService = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    const deletedDrivers =
      await deliveryModuleService.softDeleteDeliveryDrivers({
        delivery_id: input.delivery_id,
      });

    return new StepResponse(deletedDrivers, deletedDrivers);
  },
  (deletedDrivers: { id: string }[], { container }) => {
    const service = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    return service.restoreDeliveryDrivers(deletedDrivers);
  }
);
