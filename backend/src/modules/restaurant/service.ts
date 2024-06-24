import { DAL, ModulesSdkTypes, ModuleJoinerConfig } from "@medusajs/types";
import { ModulesSdkUtils } from "@medusajs/utils";
import {
  RestaurantAdminDTO,
  RestaurantDTO,
  RestaurantProductDTO,
} from "../../types/restaurant/common";
import { Restaurant, RestaurantAdmin, RestaurantProduct } from "./models";

const generateMethodForModels = [RestaurantAdmin, RestaurantProduct];

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService;
  restaurantService: ModulesSdkTypes.InternalModuleService<any>;
  restaurantAdminService: ModulesSdkTypes.InternalModuleService<any>;
  restaurantProductService: ModulesSdkTypes.InternalModuleService<any>;
};

export default class RestaurantModuleService<
  TEntity extends Restaurant = Restaurant,
  TAdmin extends RestaurantAdmin = RestaurantAdmin,
  TProduct extends RestaurantProduct = RestaurantProduct
> extends ModulesSdkUtils.abstractModuleServiceFactory<
  InjectedDependencies,
  RestaurantDTO,
  {
    Restaurant: { dto: RestaurantDTO };
    RestaurantAdmin: { dto: RestaurantAdminDTO };
    RestaurantProduct: { dto: RestaurantProductDTO };
  }
>(Restaurant, generateMethodForModels, {}) {
  protected baseRepository_: DAL.RepositoryService;
  protected readonly restaurantService_: ModulesSdkTypes.InternalModuleService<TEntity>;
  protected readonly restaurantAdminService_: ModulesSdkTypes.InternalModuleService<TAdmin>;
  protected readonly restaurantProductService_: ModulesSdkTypes.InternalModuleService<TProduct>;

  constructor({
    baseRepository,
    restaurantService,
    restaurantAdminService,
    restaurantProductService,
  }: InjectedDependencies) {
    // @ts-ignore
    super(...arguments);
    this.baseRepository_ = baseRepository;
    this.restaurantService_ = restaurantService;
    this.restaurantAdminService_ = restaurantAdminService;
    this.restaurantProductService_ = restaurantProductService;
  }

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
