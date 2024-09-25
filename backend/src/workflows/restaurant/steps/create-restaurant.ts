import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { CreateRestaurantDTO } from "../../../modules/restaurant/types/mutations";
import { RESTAURANT_MODULE } from "../../../modules/restaurant";

export const createRestaurantStepId = "create-restaurant-step";
export const createRestaurantStep = createStep(
  createRestaurantStepId,
  async function (data: CreateRestaurantDTO, { container }) {
    const restaurantModuleService = container.resolve(
      RESTAURANT_MODULE
    );

    const restaurant = await restaurantModuleService.createRestaurants(data);

    return new StepResponse(restaurant, restaurant.id);
  },
  function (input: string, { container }) {
    const restaurantModuleService = container.resolve(
      RESTAURANT_MODULE
    );

    return restaurantModuleService.deleteRestaurants([input]);
  }
);
