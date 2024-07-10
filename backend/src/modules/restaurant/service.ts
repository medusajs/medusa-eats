import { MedusaService } from "@medusajs/utils";
import { ModuleJoinerConfig } from "@medusajs/modules-sdk";
import { Restaurant, RestaurantAdmin, RestaurantProduct } from "./models";

class RestaurantModuleService extends MedusaService({
  Restaurant,
  RestaurantAdmin,
  RestaurantProduct,
}) {
  // __joinerConfig(): ModuleJoinerConfig {
  //   console.log("RestaurantModuleService");
  //   return {
  //     serviceName: "restaurantModuleService",
  //     alias: [
  //       {
  //         name: ["restaurants"],
  //         args: {
  //           entity: Restaurant.name,
  //           methodSuffix: "Restaurants",
  //         },
  //       },
  //       {
  //         name: ["restaurant_admin"],
  //         args: {
  //           entity: RestaurantAdmin.name,
  //           methodSuffix: "RestaurantAdmin",
  //         },
  //       },
  //       {
  //         name: ["restaurant_product"],
  //         args: {
  //           entity: RestaurantProduct.name,
  //           methodSuffix: "RestaurantProduct",
  //         },
  //       },
  //     ],
  //   };
  // }
}

export default RestaurantModuleService;
