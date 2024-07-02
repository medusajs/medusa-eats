import { MedusaService } from "@medusajs/utils";
import { Delivery, DeliveryDriver, Driver } from "./models";

class DeliveryModuleService extends MedusaService({
  Delivery,
  Driver,
  DeliveryDriver,
}) {}

export default DeliveryModuleService;
