import { MedusaService } from "@medusajs/utils";
import { Restaurant, RestaurantAdmin } from "./models";

class RestaurantModuleService extends MedusaService({
  Restaurant,
  RestaurantAdmin,
}) {}

export default RestaurantModuleService;
