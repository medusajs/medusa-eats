import { ModuleRegistrationName } from "@medusajs/modules-sdk";
import { IEventBusModuleService } from "@medusajs/types";
import { remoteQueryObjectFromString } from "@medusajs/utils";
import { createStep } from "@medusajs/workflows-sdk";
import {
  DriverDTO,
  IDeliveryModuleService,
} from "../../../types/delivery/common";

export const findDriverStepId = "await-driver-response-step";
export const findDriverStep = createStep<string, DriverDTO, string>(
  { name: findDriverStepId, async: true },
  async function (deliveryId: string, { container }) {
    try {
      const remoteQuery = container.resolve("remoteQuery");

      const driversQuery = remoteQueryObjectFromString({
        entryPoint: "drivers",
        fields: ["id"],
        variables: {
          skip: 0,
          take: 5,
        },
      });

      const { rows: drivers } = await remoteQuery(driversQuery).catch(
        (e) => []
      );

      const idsToNotify = drivers.map((d: DriverDTO) => d.id);

      const createData = idsToNotify.map((driverId: string) => ({
        delivery_id: deliveryId,
        driver_id: driverId,
      }));

      const deliveryService = container.resolve<IDeliveryModuleService>(
        "deliveryModuleService"
      );

      await deliveryService.createDeliveryDrivers(createData);

      const eventBus = container.resolve<IEventBusModuleService>(
        ModuleRegistrationName.EVENT_BUS
      );

      await eventBus.emit("notify.drivers", {
        drivers: idsToNotify,
        delivery_id: deliveryId,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  (input, { container }) => {
    const deliveryService = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    return deliveryService.softDeleteDeliveryDrivers(input);
  }
);
