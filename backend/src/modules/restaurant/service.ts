import { Context, DAL, ModulesSdkTypes } from "@medusajs/types"
import {
  InjectTransactionManager,
  MedusaContext,
  ModulesSdkUtils,
} from "@medusajs/utils"
import {
  RestaurantAdminDTO,
  RestaurantDTO,
  RestaurantProductDTO,
} from "../../types/restaurant/common"
import {
  CreateRestaurantAdminDTO,
  CreateRestaurantDTO,
} from "../../types/restaurant/mutations"
import { Restaurant, RestaurantAdmin, RestaurantProduct } from "./models"

const generateMethodForModels = [Restaurant, RestaurantAdmin, RestaurantProduct]

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService
  restaurantService: ModulesSdkTypes.InternalModuleService<any>
  restaurantAdminService: ModulesSdkTypes.InternalModuleService<any>
  restaurantProductService: ModulesSdkTypes.InternalModuleService<any>
}

export default class RestaurantModuleService<
  TEntity extends Restaurant = Restaurant,
  TAdmin extends RestaurantAdmin = RestaurantAdmin,
  TProduct extends RestaurantProduct = RestaurantProduct,
> extends ModulesSdkUtils.abstractModuleServiceFactory<
  InjectedDependencies,
  RestaurantDTO,
  {
    Restaurant: { dto: RestaurantDTO }
    RestaurantAdmin: { dto: RestaurantAdminDTO }
    RestaurantProduct: { dto: RestaurantProductDTO }
  }
>(Restaurant, generateMethodForModels, {}) {
  protected baseRepository_: DAL.RepositoryService
  protected readonly restaurantService_: ModulesSdkTypes.InternalModuleService<TEntity>
  protected readonly restaurantAdminService_: ModulesSdkTypes.InternalModuleService<TAdmin>
  protected readonly restaurantProductService_: ModulesSdkTypes.InternalModuleService<TProduct>

  constructor({
    baseRepository,
    restaurantService,
    restaurantAdminService,
    restaurantProductService,
  }: InjectedDependencies) {
    // @ts-ignore
    super(...arguments)
    this.baseRepository_ = baseRepository
    this.restaurantService_ = restaurantService
    this.restaurantAdminService_ = restaurantAdminService
    this.restaurantProductService_ = restaurantProductService
  }

  @InjectTransactionManager("baseRepository_")
  async createRestaurant(
    data: CreateRestaurantDTO,
    @MedusaContext() context: Context = {}
  ): Promise<RestaurantDTO> {
    const restaurant = this.restaurantService_.create(data, context)
    return this.baseRepository_.serialize<RestaurantDTO>(restaurant, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async createRestaurantAdmin(
    restaurantId: string,
    data: Partial<CreateRestaurantAdminDTO>,
    @MedusaContext() context: Context = {}
  ): Promise<RestaurantAdminDTO> {
    const restaurant = await this.restaurantService_.retrieve(restaurantId)
    data.restaurant = restaurant as RestaurantDTO
    const restaurantAdmin = this.restaurantAdminService_.create(data, context)
    return this.baseRepository_.serialize<RestaurantAdminDTO>(restaurantAdmin, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async deleteRestaurantAdmin(
    adminId: string,
    @MedusaContext() context: Context = {}
  ): Promise<void> {
    await this.restaurantAdminService_.delete(adminId, context)
  }

  @InjectTransactionManager("baseRepository_")
  async addProductToRestaurant(
    data: RestaurantProductDTO,
    @MedusaContext() context: Context = {}
  ): Promise<RestaurantProductDTO> {
    const restaurantProduct = this.restaurantProductService_.create(
      data,
      context
    )
    return this.baseRepository_.serialize<RestaurantProductDTO>(
      restaurantProduct,
      {
        populate: true,
      }
    )
  }

  @InjectTransactionManager("baseRepository_")
  async removeProductFromRestaurant(
    restaurantId: string,
    productId: string,
    @MedusaContext() context: Context = {}
  ): Promise<void> {
    await this.restaurantProductService_.delete(
      { product_id: productId, restaurant_id: restaurantId },
      context
    )
  }
}
