import { ModuleJoinerConfig } from "@medusajs/types";
import { MedusaService } from "@medusajs/utils";
import { Delivery, DeliveryDriver, Driver } from "./models";

class DeliveryModuleService extends MedusaService({
  Delivery,
  Driver,
  DeliveryDriver,
}) {
  __joinerConfig(): ModuleJoinerConfig {
    return {
      serviceName: "deliveryModuleService",
      alias: [
        {
          name: ["deliveries"],
          args: {
            entity: Delivery.name,
          },
        },
        {
          name: ["drivers"],
          args: {
            entity: Driver.name,
            methodSuffix: "Drivers",
          },
        },
        {
          name: ["deliveryDrivers"],
          args: {
            entity: DeliveryDriver.name,
            methodSuffix: "DeliveryDrivers",
          },
        },
      ],
    };
  }
}

export default DeliveryModuleService;
