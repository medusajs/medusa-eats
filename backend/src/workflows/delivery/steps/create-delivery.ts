import { MedusaError, remoteQueryObjectFromString } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { IDeliveryModuleService } from "../../../types/delivery/common";

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
      cart_id: cart.id,
      restaurant_id,
      transaction_id: context.transactionId,
    };

    const service = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    const delivery = await service.createDeliveries(data);

    return new StepResponse(delivery, delivery.id);
  },
  (deliveryId: string, { container }) => {
    const service = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    return service.softDeleteDeliveries(deliveryId);
  }
);
