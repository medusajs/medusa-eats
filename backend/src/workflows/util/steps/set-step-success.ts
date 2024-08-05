import {
  ModuleRegistrationName,
  TransactionHandlerType,
} from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { DeliveryDTO } from "src/types/delivery/common";
import { handleDeliveryWorkflowId } from "../../delivery/workflows/handle-delivery";

type SetStepSuccessStepInput = {
  stepId?: string;
  updatedDelivery: DeliveryDTO;
};

export const setStepSuccessStepId = "set-step-success-step";
export const setStepSuccessStep = createStep(
  setStepSuccessStepId,
  async function (
    { stepId, updatedDelivery }: SetStepSuccessStepInput,
    { container }
  ) {
    if (!stepId) {
      return;
    }

    const engineService = container.resolve(
      ModuleRegistrationName.WORKFLOW_ENGINE
    );

    await engineService.setStepSuccess({
      idempotencyKey: {
        action: TransactionHandlerType.INVOKE,
        transactionId: updatedDelivery.transaction_id,
        stepId,
        workflowId: handleDeliveryWorkflowId,
      },
      stepResponse: new StepResponse(updatedDelivery, updatedDelivery.id),
      options: {
        container,
      },
    });
  }
);
