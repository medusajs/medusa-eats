import {
  CartLineItemDTO,
  OrderLineItemDTO,
  IModuleService,
} from "@medusajs/types";
import {
  CreateDeliveryDTO,
  CreateDeliveryDriverDTO,
  CreateDriverDTO,
  UpdateDeliveryDTO,
  UpdateDriverDTO,
} from "./mutations";
import { Delivery } from "src/modules/delivery/models";

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
  createDelivery(data: CreateDeliveryDTO): Promise<Delivery>;
  createDriver(data: CreateDriverDTO): Promise<DriverDTO>;
  createDeliveryDriver(
    deliveryId: string,
    driverId: string
  ): Promise<DeliveryDriverDTO>;
  retrieve(deliveryId: string): Promise<DeliveryDTO>;
  retrieveDelivery(deliveryId: string): Promise<DeliveryDTO>;
  retrieveDriver(driverId: string): Promise<DriverDTO>;
  updateDelivery(
    deliveryId: string,
    data: UpdateDeliveryDTO
  ): Promise<DeliveryDTO>;
  updateDriver(driverId: string, data: UpdateDriverDTO): Promise<DriverDTO>;
  delete(deliveryId: string): Promise<void>;
  deleteDelivery(deliveryId: string): Promise<void>;
  deleteDriver(driverId: string): Promise<void>;
  deleteDeliveryDriver(data: Partial<CreateDeliveryDriverDTO>): Promise<void>;
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
  delivery_id: string;
  driver_id: string;
}
