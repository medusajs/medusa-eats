import { ModuleJoinerConfig } from "@medusajs/types";
import { MedusaService } from "@medusajs/utils";
import { Restaurant, RestaurantAdmin, RestaurantProduct } from "./models";

class RestaurantModuleService extends MedusaService({
  Restaurant,
  RestaurantAdmin,
  RestaurantProduct,
}) {
  __joinerConfig(): ModuleJoinerConfig {
    return {
      serviceName: "restaurantModuleService",
      alias: [
        {
          name: ["restaurants"],
          args: {
            entity: Restaurant.name,
          },
        },
        {
          name: ["restaurantAdmins"],
          args: {
            entity: RestaurantAdmin.name,
            methodSuffix: "RestaurantAdmins",
          },
        },
        {
          name: ["restaurantProducts"],
          args: {
            entity: RestaurantProduct.name,
            methodSuffix: "RestaurantProducts",
          },
        },
      ],
    };
  }
}

export default RestaurantModuleService;
