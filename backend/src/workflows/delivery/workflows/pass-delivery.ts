import { createWorkflow, WorkflowData } from "@medusajs/workflows-sdk";
import { DeliveryDTO } from "../../../types/delivery/common";
import { deleteDeliveryDriversStep } from "../../delivery/steps";

export type WorkflowInput = {
  driver_id: string;
  delivery_id: string;
};

export const passDeliveryWorkflow = createWorkflow<WorkflowInput, DeliveryDTO>(
  "pass-delivery-workflow",
  function (input: WorkflowData<WorkflowInput>) {
    // Delete the delivery drivers as they are no longer needed
    deleteDeliveryDriversStep({
      delivery_id: input.delivery_id,
      driver_id: input.driver_id,
    });
  }
);
