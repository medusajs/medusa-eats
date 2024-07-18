import { createWorkflow, WorkflowData } from "@medusajs/workflows-sdk";
import { CreateRestaurantDTO } from "../../../types/restaurant/mutations";
import { createRestaurantStep } from "../steps";

type WorkflowInput = {
  restaurant: CreateRestaurantDTO;
};

export const createRestaurantWorkflow = createWorkflow(
  "create-restaurant-workflow",
  (input: WorkflowData<WorkflowInput>) => {
    const restaurant = createRestaurantStep(input.restaurant);

    return restaurant;
  }
);
