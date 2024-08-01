import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk";
import { CreateRestaurantDTO } from "../../../types/restaurant/mutations";
import { createRestaurantStep } from "../steps";

type WorkflowInput = {
  restaurant: CreateRestaurantDTO;
};

export const createRestaurantWorkflow = createWorkflow(
  "create-restaurant-workflow",
  function (input: WorkflowData<WorkflowInput>) {
    const restaurant = createRestaurantStep(input.restaurant);

    return new WorkflowResponse(restaurant);
  }
);
