import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@medusajs/workflows-sdk";
import { DeliveryDTO } from "src/types/delivery/common";
import { createDeliveryStep } from "../../delivery/steps";

type WorkflowInput = {
  cart_id: string;
  restaurant_id: string;
};

export const createDeliveryWorkflowId = "create-delivery-workflow";
export const createDeliveryWorkflow = createWorkflow(
  createDeliveryWorkflowId,
  function (input: WorkflowData<WorkflowInput>): WorkflowResponse<DeliveryDTO> {
    const delivery = createDeliveryStep(input);

    return new WorkflowResponse(delivery);
  }
);
