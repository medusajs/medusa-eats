import { DAL, ModuleJoinerConfig, ModulesSdkTypes } from "@medusajs/types";
import { ModulesSdkUtils } from "@medusajs/utils";
import {
  DeliveryDTO,
  DeliveryDriverDTO,
  DriverDTO,
} from "../../types/delivery/common";
import { Delivery, DeliveryDriver, Driver } from "./models";

const generateMethodForModels = [Delivery, Driver, DeliveryDriver];

type InjectedDependencies = {
  baseRepository: DAL.RepositoryService;
  deliveryService: ModulesSdkTypes.InternalModuleService<any>;
  driverService: ModulesSdkTypes.InternalModuleService<any>;
  deliveryDriverService: ModulesSdkTypes.InternalModuleService<any>;
};

export default class DeliveryModuleService<
  TEntity extends Delivery = Delivery,
  TDriver extends Driver = Driver,
  TDeliveryDriver extends DeliveryDriver = DeliveryDriver
> extends ModulesSdkUtils.abstractModuleServiceFactory<
  InjectedDependencies,
  DeliveryDTO,
  {
    Delivery: { dto: DeliveryDTO };
    Driver: { dto: DriverDTO };
    DeliveryDriver: { dto: DeliveryDriverDTO };
  }
>(Delivery, generateMethodForModels, {}) {
  protected baseRepository_: DAL.RepositoryService;
  protected readonly deliveryService_: ModulesSdkTypes.InternalModuleService<TEntity>;
  protected readonly driverService_: ModulesSdkTypes.InternalModuleService<TDriver>;
  protected readonly deliveryDriverService_: ModulesSdkTypes.InternalModuleService<TDeliveryDriver>;

  constructor({
    baseRepository,
    deliveryService,
    driverService,
    deliveryDriverService,
  }: InjectedDependencies) {
    // @ts-ignore
    super(...arguments);
    this.baseRepository_ = baseRepository;
    this.deliveryService_ = deliveryService;
    this.driverService_ = driverService;
    this.deliveryDriverService_ = deliveryDriverService;
  }

  createDrivers(data: DriverDTO | DriverDTO[]): Promise<DriverDTO> {
    return this.driverService_.create(data);
  }

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
