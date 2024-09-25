import { remoteQueryObjectFromString } from "@medusajs/utils";
import { StepResponse, createStep } from "@medusajs/workflows-sdk";
import { DriverDTO } from "../../../modules/delivery/types/common";
import { DELIVERY_MODULE } from "../../../modules/delivery";

export type DeleteDeliveryDriversStepInput = {
  delivery_id: string;
  driver_id?: string
};

export const deleteDeliveryDriversStepId = "delete-delivery-drivers-step";
export const deleteDeliveryDriversStep = createStep(
  deleteDeliveryDriversStepId,
  async function (input: DeleteDeliveryDriversStepInput, { container }) {
    const remoteQuery = container.resolve("remoteQuery");

    const driverQuery = remoteQueryObjectFromString({
      entryPoint: "delivery_driver",
      variables: {
        filters: input,
      },
      fields: ["id"],
    });

    const drivers = await remoteQuery(driverQuery)
      .then((res) => res.map((d: DriverDTO) => d.id))
      .catch(() => []);

    const deliveryModuleService = container.resolve(DELIVERY_MODULE);

    await deliveryModuleService.softDeleteDeliveryDrivers(drivers);

    return new StepResponse(drivers, drivers);
  },
  (deletedDrivers: string[], { container }) => {
    const service = container.resolve(DELIVERY_MODULE);

    return service.restoreDeliveryDrivers(deletedDrivers);
  }
);
