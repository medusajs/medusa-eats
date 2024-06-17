import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { IEventBusModuleService } from "@medusajs/types";
import { remoteQueryObjectFromString } from "@medusajs/utils";
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

    const delivery = await remoteQuery(deliveryQuery);

    const { restaurant_id } = delivery;

    const eventBus = container.resolve<IEventBusModuleService>(
      ModuleRegistrationName.EVENT_BUS
    );

    await eventBus.emit("notify.restaurant", {
      restaurant_id,
      delivery_id: delivery.id,
    });
  },
  function (input: string, { container }) {
    // To do: Handle error
    console.log("Error notifying restaurant");
  }
);
