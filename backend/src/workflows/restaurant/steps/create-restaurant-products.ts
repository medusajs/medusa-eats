import { StepResponse, createStep } from "@medusajs/workflows-sdk";

type StepInput = {
  product_ids: string[];
  restaurant_id: string;
};

export const createRestaurantProductsStepId = "create-restaurant-product-step";
export const createRestaurantProductsStep = createStep(
  createRestaurantProductsStepId,
  async function (data: StepInput, { container }) {
    const restaurantModuleService = container.resolve(
      "restaurantModuleService"
    );

    const restaurantProductData = data.product_ids.map((product_id) => ({
      restaurant_id: data.restaurant_id,
      product_id,
    }));

    // Add the product to the restaurant
    const restaurantProduct =
      await restaurantModuleService.createRestaurantProducts(
        restaurantProductData
      );

    return new StepResponse(restaurantProduct, {
      product_ids: data.product_ids,
      restaurant_id: data.restaurant_id,
    });
  },
  function (
    input: {
      product_ids: string[];
      restaurant_id: string;
    },
    { container }
  ) {
    const restaurantModuleService = container.resolve(
      "restaurantModuleService"
    );

    const restaurantProductData = input.product_ids.map((product_id) => ({
      restaurant_id: input.restaurant_id,
      product_id,
    }));

    return restaurantModuleService.deleteRestaurantProducts(
      restaurantProductData
    );
  }
);
