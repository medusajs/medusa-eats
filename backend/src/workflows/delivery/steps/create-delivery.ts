import {
  MedusaError,
  Modules,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";

export type CreateDeliveryStepInput = {
  cart_id: string;
};

export const createDeliveryStepId = "create-delivery-step";
export const createDeliveryStep = createStep(
  createDeliveryStepId,
  async function (input: CreateDeliveryStepInput, { container, context }) {
    const remoteQuery = container.resolve("remoteQuery");

    const cartQuery = remoteQueryObjectFromString({
      entryPoint: "carts",
      variables: {
        id: input.cart_id,
      },
      fields: ["id", "metadata.restaurant_id"],
    });

    const cart = await remoteQuery(cartQuery).then((res) => res[0]);

    const restaurant_id = cart.metadata?.restaurant_id as string;

    if (!restaurant_id) {
      throw MedusaError.Types.INVALID_DATA;
    }

    const data = {
      transaction_id: context.transactionId,
    };

    const service = container.resolve("deliveryModuleService");

    const delivery = await service.createDeliveries(data);

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
        deliveryModuleService: {
          delivery_id: delivery.id,
        },
        restaurantModuleService: {
          restaurant_id,
        },
      },
    ]);

    return new StepResponse(delivery, {
      delivery_id: delivery.id,
      cart_id: input.cart_id,
      restaurant_id,
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
        deliveryModuleService: {
          delivery_id,
        },
        restaurantModuleService: {
          restaurant_id,
        },
      },
    ]);

    return deleted;
  }
);
