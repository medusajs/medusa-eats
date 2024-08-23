import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
  transform,
} from "@medusajs/workflows-sdk";
import { Modules } from "@medusajs/utils"
import { createRemoteLinkStep } from "@medusajs/core-flows"
import { DeliveryDTO } from "../../../modules/delivery/types/common";
import { createDeliveryStep } from "../../delivery/steps";
import { DELIVERY_MODULE } from "../../../modules/delivery";
import { RESTAURANT_MODULE } from "../../../modules/restaurant";

type WorkflowInput = {
  cart_id: string;
  restaurant_id: string;
};

export const createDeliveryWorkflowId = "create-delivery-workflow";
export const createDeliveryWorkflow = createWorkflow(
  createDeliveryWorkflowId,
  function (input: WorkflowData<WorkflowInput>): WorkflowResponse<DeliveryDTO> {
    const delivery = createDeliveryStep();

    const links = transform({
      input,
      delivery
    }, (data) => ([
      {
        [DELIVERY_MODULE]: {
          delivery_id: data.delivery.id
        },
        [Modules.CART]: {
          cart_id: data.input.cart_id
        }
      },
      {
        [RESTAURANT_MODULE]: {
          restaurant_id: data.input.restaurant_id
        },
        [DELIVERY_MODULE]: {
          delivery_id: data.delivery.id
        }
      }
    ]))

    createRemoteLinkStep(links)

    return new WorkflowResponse(delivery);
  }
);
