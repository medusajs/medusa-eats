import { Modules } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";

export type CreateDeliveryStepInput = {
  cart_id: string;
  restaurant_id: string;
};

export const createDeliveryStepId = "create-delivery-step";
export const createDeliveryStep = createStep(
  createDeliveryStepId,
  async function (input: CreateDeliveryStepInput, { container }) {
    const service = container.resolve("deliveryModuleService");

    const delivery = await service.createDeliveries({});

    const remoteLink = container.resolve("remoteLink");

    await remoteLink.create([
      {
        deliveryModuleService: {
          delivery_id: delivery.id,
        },
        [Modules.CART]: {
          cart_id: input.cart_id,
        },
      },
      {
        restaurantModuleService: {
          restaurant_id: input.restaurant_id,
        },
        deliveryModuleService: {
          delivery_id: delivery.id,
        },
      },
    ]);

    return new StepResponse(delivery, {
      delivery_id: delivery.id,
      cart_id: input.cart_id,
      restaurant_id: input.restaurant_id,
    });
  },
  async function (
    {
      delivery_id,
      cart_id,
      restaurant_id,
    }: {
      delivery_id: string;
      cart_id: string;
      restaurant_id: string;
    },
    { container }
  ) {
    const service = container.resolve("deliveryModuleService");
    const remoteLink = container.resolve("remoteLink");

    const deleted = service.softDeleteDeliveries(delivery_id);

    await remoteLink.dismiss([
      {
        deliveryModuleService: {
          delivery_id,
        },
        [Modules.CART]: {
          cart_id,
        },
      },
      {
        restaurantModuleService: {
          restaurant_id,
        },
        deliveryModuleService: {
          delivery_id,
        },
      },
    ]);

    return deleted;
  }
);
