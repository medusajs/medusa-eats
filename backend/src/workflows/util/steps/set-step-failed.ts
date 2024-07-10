import { IWorkflowEngineService } from "@medusajs/types";
import {
  ModuleRegistrationName,
  TransactionHandlerType,
} from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { DeliveryDTO } from "src/types/delivery/common";
import { handleDeliveryWorkflowId } from "../../delivery/workflows/handle-delivery";

type SetStepFailedtepInput = {
  stepId?: string;
  updatedDelivery: DeliveryDTO;
};

export const setStepFailedStepId = "set-step-failed-step";
export const setStepFailedStep = createStep(
  setStepFailedStepId,
  async function (
    { stepId, updatedDelivery }: SetStepFailedtepInput,
    { container }
  ) {
    if (!stepId) {
      return;
    }

    const engineService = container.resolve<IWorkflowEngineService>(
      ModuleRegistrationName.WORKFLOW_ENGINE
    );

    await engineService.setStepFailure({
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
