import { deleteProductsWorkflow } from "@medusajs/core-flows";
import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@medusajs/workflows-sdk";
import { deleteRestaurantProductsStep } from "../steps";

type WorkflowInput = {
  product_ids: string[];
  restaurant_id: string;
};

export const deleteRestaurantProductsWorkflow = createWorkflow(
  "delete-restaurant-products-workflow",
  function (input: WorkflowData<WorkflowInput>) {
    deleteProductsWorkflow.runAsStep({
      input: {
        ids: input.product_ids,
      },
    });

    const result = deleteRestaurantProductsStep({
      product_ids: input.product_ids,
      restaurant_id: input.restaurant_id,
    });

    return new WorkflowResponse(result);
  }
);
