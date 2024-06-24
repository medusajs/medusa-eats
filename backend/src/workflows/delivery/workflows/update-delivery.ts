import { createWorkflow, WorkflowData } from "@medusajs/workflows-sdk";
import { DeliveryDTO } from "../../../types/delivery/common";
import { UpdateDeliveryDTO } from "../../../types/delivery/mutations";
import { updateDeliveryStep } from "../../delivery/steps";
import { setStepFailedStep, setStepSuccessStep } from "../../util/steps";

export type WorkflowInput = {
  data: UpdateDeliveryDTO;
  stepIdToSucceed?: string;
  stepIdToFail?: string;
};

export const updateDeliveryWorkflow = createWorkflow<
  WorkflowInput,
  DeliveryDTO
>("update-delivery-workflow", function (input: WorkflowData<WorkflowInput>) {
  // Update the delivery with the provided data
  const updatedDelivery = updateDeliveryStep({
    data: input.data,
  });

  // If a stepIdToSucceed is provided, we will set that step as successful
  setStepSuccessStep({
    stepId: input.stepIdToSucceed,
    updatedDelivery,
  });

  // If a stepIdToFail is provided, we will set that step as failed
  setStepFailedStep({
    stepId: input.stepIdToFail,
    updatedDelivery,
  });

  // Return the updated delivery
  return updatedDelivery;
});
