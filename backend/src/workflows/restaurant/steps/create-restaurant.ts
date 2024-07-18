import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { IRestaurantModuleService } from "../../../types/restaurant/common";
import { CreateRestaurantDTO } from "../../../types/restaurant/mutations";

export const createRestaurantStepId = "create-restaurant-step";
export const createRestaurantStep = createStep(
  createRestaurantStepId,
  async function (data: CreateRestaurantDTO, { container }) {
    const restaurantModuleService = container.resolve<IRestaurantModuleService>(
      "restaurantModuleService"
    );

    const restaurant = await restaurantModuleService.createRestaurants(data);

    return new StepResponse(restaurant, restaurant.id);
  },
  function (input: string, { container }) {
    const restaurantModuleService = container.resolve<IRestaurantModuleService>(
      "restaurantModuleService"
    );

    return restaurantModuleService.deleteRestaurants([input]);
  }
);
