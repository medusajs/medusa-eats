import { CartService, OrderService } from "@medusajs/medusa"
import { Context, DAL, ModulesSdkTypes } from "@medusajs/types"
import {
  InjectTransactionManager,
  MedusaContext,
  ModulesSdkUtils,
} from "@medusajs/utils"
import { DeliveryDTO, DriverDTO } from "../../types/delivery/common"
import {
  CreateDeliveryDTO,
  CreateDriverDTO,
} from "../../types/delivery/mutations"
import { Delivery, Driver } from "./models"

const generateMethodForModels = [Delivery, Driver]

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService
  cartService: CartService
  orderService: OrderService
  deliveryService: ModulesSdkTypes.InternalModuleService<any>
  driverService: ModulesSdkTypes.InternalModuleService<any>
}

export default class DeliveryModuleService<
  TEntity extends Delivery = Delivery,
  TDriver extends Driver = Driver,
> extends ModulesSdkUtils.abstractModuleServiceFactory<
  InjectedDependencies,
  DeliveryDTO,
  {
    Delivery: { dto: DeliveryDTO }
    Driver: { dto: DriverDTO }
  }
>(Delivery, generateMethodForModels, {}) {
  protected baseRepository_: DAL.RepositoryService
  protected readonly deliveryService_: ModulesSdkTypes.InternalModuleService<TEntity>
  protected readonly driverService_: ModulesSdkTypes.InternalModuleService<TDriver>

  constructor({
    baseRepository,
    deliveryService,
    driverService,
  }: InjectedDependencies) {
    // @ts-ignore
    super(...arguments)
    this.baseRepository_ = baseRepository
    this.deliveryService_ = deliveryService
    this.driverService_ = driverService
  }

  @InjectTransactionManager("baseRepository_")
  async createDelivery(
    data: CreateDeliveryDTO,
    @MedusaContext() context: Context = {}
  ): Promise<DeliveryDTO> {
    const delivery = this.deliveryService_.create(data, context)
    return this.baseRepository_.serialize<DeliveryDTO>(delivery, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async updateDelivery(
    deliveryId: string,
    data: Partial<CreateDeliveryDTO>,
    @MedusaContext() context: Context = {}
  ): Promise<DeliveryDTO> {
    const delivery = await this.deliveryService_.retrieve(deliveryId, {})
    const updatedDelivery = await this.deliveryService_.update({
      ...delivery,
      ...data,
    })

    return this.baseRepository_.serialize<DeliveryDTO>(updatedDelivery, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async addDriverToDelivery(
    deliveryId: string,
    driverId: string,
    @MedusaContext() context: Context = {}
  ): Promise<DeliveryDTO> {
    const delivery = await this.deliveryService_.retrieve(deliveryId, {})
    const driver = await this.driverService_.retrieve(driverId, {})

    delivery.driver = driver
    await this.deliveryService_.update({ ...delivery })

    return this.baseRepository_.serialize<DeliveryDTO>(delivery, {
      populate: true,
    })
  }

  @InjectTransactionManager("baseRepository_")
  async createDriver(
    data: CreateDriverDTO,
    @MedusaContext() context: Context = {}
  ): Promise<DriverDTO> {
    const driver = this.driverService_.create(data, context)
    return this.baseRepository_.serialize<DriverDTO>(driver, {
      populate: true,
    })
  }
}
