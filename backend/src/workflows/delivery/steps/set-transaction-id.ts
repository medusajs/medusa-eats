import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { DELIVERY_MODULE } from "../../../modules/delivery";

export type SetTransactionIdStepInput = {
  delivery_id: string;
};

export const setTransactionIdStepId = "create-delivery-step";
export const setTransactionIdStep = createStep(
  setTransactionIdStepId,
  async function (deliveryId: string, { container, context }) {
    const service = container.resolve(DELIVERY_MODULE);

    const delivery = await service.updateDeliveries({
      id: deliveryId,
      transaction_id: context.transactionId,
    });

    return new StepResponse(delivery, delivery.id);
  },
  async function (delivery_id: string, { container }) {
    const service = container.resolve(DELIVERY_MODULE);

    const delivery = await service.updateDeliveries({
      id: delivery_id,
      transaction_id: null,
    });
  }
);
