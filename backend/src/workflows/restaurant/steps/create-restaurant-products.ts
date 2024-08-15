import { ContainerRegistrationKeys, Modules } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";

type StepInput = {
  product_ids: string[];
  restaurant_id: string;
};

export const createRestaurantProductsStepId = "create-restaurant-product-step";
export const createRestaurantProductsStep = createStep(
  createRestaurantProductsStepId,
  async function (data: StepInput, { container }) {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    // Add the product to the restaurant
    for (const product_id of data.product_ids) {
      await remoteLink.create({
        restaurantModuleService: {
          restaurant_id: data.restaurant_id,
        },
        [Modules.PRODUCT]: {
          product_id,
        },
      });
    }

    return new StepResponse("Links created", {
      product_ids: data.product_ids,
      restaurant_id: data.restaurant_id,
    });
  },
  async function (
    input: {
      product_ids: string[];
      restaurant_id: string;
    },
    { container }
  ) {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    // Dismiss the link between the product and the restaurant
    for (const product_id of input.product_ids) {
      await remoteLink.dismiss({
        restaurantModuleService: {
          restaurant_id: input.restaurant_id,
        },
        [Modules.PRODUCT]: {
          product_id,
        },
      });
    }
  }
);
