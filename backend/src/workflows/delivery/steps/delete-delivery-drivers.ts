import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import {
  DriverDTO,
  IDeliveryModuleService,
} from "../../../types/delivery/common";
import { remoteQueryObjectFromString } from "@medusajs/utils";

export type CreateDeliveryStepInput = {
  delivery_id: string;
  driver_id?: string;
};

export const deleteDeliveryDriversStepId = "delete-delivery-drivers-step";
export const deleteDeliveryDriversStep = createStep(
  deleteDeliveryDriversStepId,
  async function (input: CreateDeliveryStepInput, { container, context }) {
    console.log("deleteDeliveryDriversStep");
    console.log({ input });

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

    console.log({ drivers });

    const deliveryModuleService = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    await deliveryModuleService.softDeleteDeliveryDrivers(drivers);

    return new StepResponse(drivers, drivers);
  },
  (deletedDrivers: string[], { container }) => {
    const service = container.resolve<IDeliveryModuleService>(
      "deliveryModuleService"
    );

    return service.restoreDeliveryDrivers(deletedDrivers);
  }
);
