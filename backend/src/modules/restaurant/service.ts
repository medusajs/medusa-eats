import { MedusaService } from "@medusajs/utils";
import { ModuleJoinerConfig } from "@medusajs/modules-sdk";
import { Restaurant, RestaurantAdmin, RestaurantProduct } from "./models";

class RestaurantModuleService extends MedusaService({
  Restaurant,
  RestaurantAdmin,
  RestaurantProduct,
}) {}

export default RestaurantModuleService;
