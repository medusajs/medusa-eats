import {
  CartLineItemDTO,
  IModuleService,
  OrderLineItemDTO,
} from "@medusajs/types";
import {
  CreateDeliveryDTO,
  CreateDriverDTO,
  UpdateDeliveryDTO,
  UpdateDriverDTO,
} from "./mutations";

export enum DeliveryStatus {
  PENDING = "pending",
  RESTAURANT_DECLINED = "restaurant_declined",
  RESTAURANT_ACCEPTED = "restaurant_accepted",
  PICKUP_CLAIMED = "pickup_claimed",
  RESTAURANT_PREPARING = "restaurant_preparing",
  READY_FOR_PICKUP = "ready_for_pickup",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
}

export interface IDeliveryModuleService extends IModuleService {
  listDrivers(filter?: any, options?: any): Promise<DriverDTO[]>;
  listDeliveries(filter?: any, options?: any): Promise<DeliveryDTO[]>;
  listDeliveryDrivers(filter: any): Promise<DeliveryDriverDTO[]>;
  createDeliveries(data: CreateDeliveryDTO): Promise<DeliveryDTO>;
  createDrivers(data: CreateDriverDTO | CreateDriverDTO[]): Promise<DriverDTO>;
  createDeliveryDrivers(
    data: {
      delivery_id: string;
      driver_id: string;
    }[]
  ): Promise<DeliveryDriverDTO[]>;
  retrieveDelivery(deliveryId: string): Promise<DeliveryDTO>;
  retrieveDriver(driverId: string): Promise<DriverDTO>;
  updateDeliveries(
    data: UpdateDeliveryDTO | UpdateDeliveryDTO[]
  ): Promise<DeliveryDTO[]>;
  updateDrivers(data: UpdateDriverDTO | UpdateDriverDTO[]): Promise<DriverDTO>;
  deleteDeliveries(ids: string | string[]): Promise<void>;
  deleteDrivers(ids: string | string[]): Promise<void>;
  deleteDeliveryDrivers(ids: string | string[]): Promise<{ id: string }[]>;
  softDeleteDeliveryDrivers(ids: string | string[]): Promise<{ id: string }[]>;
  softDeleteDeliveries(ids: string | string[]): Promise<void>;
  restoreDeliveryDrivers(ids: string | string[]): Promise<{ id: string }[]>;
}

export interface DeliveryDTO {
  id: string;
  transaction_id: string;
  driver_id?: string;
  cart_id?: string;
  order_id?: string;
  restaurant_id: string;
  delivered_at?: Date;
  delivery_status: DeliveryStatus;
  created_at: Date;
  updated_at: Date;
  eta?: Date;
  items: DeliveryItemDTO[];
}

export type DeliveryItemDTO = (CartLineItemDTO | OrderLineItemDTO) & {
  quantity: number;
};

export interface DriverDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface DeliveryDriverDTO {
  id: string;
  delivery_id: string;
  driver_id: string;
}
