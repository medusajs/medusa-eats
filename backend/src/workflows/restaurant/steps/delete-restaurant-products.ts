import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { RemoteLink } from "@medusajs/modules-sdk";
import { ContainerRegistrationKeys } from "@medusajs/utils";
import { Modules } from "@medusajs/utils";

type StepInput = {
  product_ids: string[];
  restaurant_id: string;
};

export const deleteRestaurantProductsStepId = "delete-restaurant-product-step";
export const deleteRestaurantProductsStep = createStep(
  deleteRestaurantProductsStepId,
  async function (data: StepInput, { container }) {
    const remoteLink: RemoteLink = container.resolve(
      ContainerRegistrationKeys.REMOTE_LINK
    );

    // Delete the link between the product and the restaurant and all the linked entities
    for (const product_id of data.product_ids) {
      await remoteLink.dismiss({
        [Modules.PRODUCT]: {
          product_id,
        },
        restaurantModuleService: {
          restaurant_id: data.restaurant_id,
        },
      });

      await remoteLink.delete({
        [Modules.PRODUCT]: {
          product_id,
        },
      });
    }

    return new StepResponse("Links deleted", {
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
    const remoteLink: RemoteLink = container.resolve(
      ContainerRegistrationKeys.REMOTE_LINK
    );

    // Restore the link between the product and the restaurant
    for (const product_id of input.product_ids) {
      await remoteLink.restore({
        [Modules.PRODUCT]: {
          product_id,
        },
      });
    }
  }
);
