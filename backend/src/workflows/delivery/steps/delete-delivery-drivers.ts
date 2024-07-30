import { remoteQueryObjectFromString } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { DriverDTO } from "../../../types/delivery/common";

export type CreateDeliveryStepInput = {
  delivery_id: string;
  driver_id?: string;
};

export const deleteDeliveryDriversStepId = "delete-delivery-drivers-step";
export const deleteDeliveryDriversStep = createStep(
  deleteDeliveryDriversStepId,
  async function (input: CreateDeliveryStepInput, { container, context }) {
    const remoteQuery = container.resolve("remoteQuery");

    const driverQuery = remoteQueryObjectFromString({
      entryPoint: "delivery_driver",
      variables: {
        filters: {
          delivery_id: input.delivery_id,
        },
      },
      fields: ["id"],
    });

    const drivers = await remoteQuery(driverQuery)
      .then((res) => res.map((d: DriverDTO) => d.id))
      .catch(() => []);

    const deliveryModuleService = container.resolve("deliveryModuleService");

    await deliveryModuleService.softDeleteDeliveryDrivers(drivers);

    return new StepResponse(drivers, drivers);
  },
  (deletedDrivers: string[], { container }) => {
    const service = container.resolve("deliveryModuleService");

    return service.restoreDeliveryDrivers(deletedDrivers);
  }
);
