import {
  ModuleRegistrationName,
  remoteQueryObjectFromString,
} from "@medusajs/utils";
import { createStep } from "@medusajs/workflows-sdk";

export const notifyRestaurantStepId = "notify-restaurant-step";
export const notifyRestaurantStep = createStep(
  { name: notifyRestaurantStepId, async: true, timeout: 60 * 5, maxRetries: 2 },
  async function (deliveryId: string, { container, context }) {
    const remoteQuery = container.resolve("remoteQuery");

    const deliveryQuery = remoteQueryObjectFromString({
      entryPoint: "deliveries",
      variables: {
        filters: {
          id: deliveryId,
        },
      },
      fields: ["id", "restaurant_id"],
    });

    const delivery = await remoteQuery(deliveryQuery).then((res) => res[0]);

    const { restaurant_id } = delivery;

    const eventBus = container.resolve(ModuleRegistrationName.EVENT_BUS);

    await eventBus.emit({
      eventName: "notify.restaurant",
      data: {
        restaurant_id,
        delivery_id: delivery.id,
      },
    });
  },
  function (input: string, { container }) {
    const logger = container.resolve("logger");

    logger.error("Failed to notify restaurant", { input });
  }
);
