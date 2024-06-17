import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { IEventBusModuleService } from "@medusajs/types";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import { createStep } from "@medusajs/workflows-sdk";
import { DriverDTO, IDeliveryModuleService } from "../../types/delivery/common";

export const findDriverStepStepId = "await-driver-response-step";
export const findDriverStep = createStep<string, DriverDTO, string>(
  { name: findDriverStepStepId, async: true },
  async function (deliveryId: string, { container }) {
    const remoteQuery = container.resolve("remoteQuery");

    const driversQuery = remoteQueryObjectFromString({
      entryPoint: "drivers",
      fields: ["id"],
      variables: {
        skip: 0,
        take: 5,
      },
    });

    const drivers = await remoteQuery(driversQuery).catch((e) => []);

    const idsToNotify = drivers.map((d: DriverDTO) => d.id);

    const notificationData = idsToNotify.map((driverId: string) => ({
      delivery_id: deliveryId,
      driver_id: driverId,
    }));

    const deliveryService = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    await deliveryService.createDeliveryDrivers(notificationData);

    const eventBus = container.resolve<IEventBusModuleService>(
      ModuleRegistrationName.EVENT_BUS
    );

    await eventBus.emit("notify.drivers", {
      drivers: idsToNotify,
      delivery_id: deliveryId,
    });
  },
  (input: string, { container }) => {
    // To do: Handle error
    console.log("Error notifying drivers");
  }
);
