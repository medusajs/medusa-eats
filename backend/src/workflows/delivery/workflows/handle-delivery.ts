import { WorkflowData, createWorkflow } from "@medusajs/workflows-sdk";
import { Delivery } from "../../../modules/delivery/models";
import {
  awaitDeliveryStep,
  awaitPickUpStep,
  awaitPreparationStep,
  awaitStartPreparationStep,
  createDeliveryStep,
  createFulfillmentStep,
  createOrderStep,
  findDriverStep,
  notifyRestaurantStep,
} from "../../util";

type WorkflowInput = {
  cart_id: string;
};

const TWO_HOURS = 60 * 60 * 2;
export const handleDeliveryWorkflowId = "handle-delivery-workflow";
export const handleDeliveryWorkflow = createWorkflow<WorkflowInput, Delivery>(
  {
    name: handleDeliveryWorkflowId,
    store: true,
    retentionTime: TWO_HOURS,
  },
  function (input: WorkflowData<WorkflowInput>) {
    const delivery = createDeliveryStep(input);

    notifyRestaurantStep(delivery.id);

    findDriverStep(delivery.id);

    const order = createOrderStep(delivery.id);

    awaitStartPreparationStep();

    awaitPreparationStep();

    createFulfillmentStep(order);

    awaitPickUpStep();

    awaitDeliveryStep();
  }
);
