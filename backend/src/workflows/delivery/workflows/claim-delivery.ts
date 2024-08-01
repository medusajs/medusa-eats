import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import { DeliveryStatus } from "../../../types/delivery/common";
import { setStepSuccessStep } from "../../util/steps";
import { deleteDeliveryDriversStep, updateDeliveryStep } from "../steps";
import { findDriverStepId } from "../steps/find-driver";

export type WorkflowInput = {
  driver_id: string;
  delivery_id: string;
};

export const claimDeliveryWorkflow = createWorkflow(
  "claim-delivery-workflow",
  function (input: WorkflowData<WorkflowInput>) {
    // Update the delivery with the provided data
    const claimedDelivery = updateDeliveryStep({
      data: {
        id: input.delivery_id,
        driver_id: input.driver_id,
        delivery_status: DeliveryStatus.PICKUP_CLAIMED,
      },
    });

    // Delete the delivery drivers as they are no longer needed
    deleteDeliveryDriversStep({ delivery_id: claimedDelivery.id });

    // Set the step success for the find driver step
    setStepSuccessStep({
      stepId: findDriverStepId,
      updatedDelivery: claimedDelivery,
    });

    // Return the updated delivery
    return new WorkflowResponse(claimedDelivery);
  }
);
