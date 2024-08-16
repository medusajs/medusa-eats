import {
  CartLineItemDTO,
  OrderLineItemDTO,
  CartDTO,
  OrderDTO,
} from "@medusajs/types";
import type DeliveryModuleService from "../../modules/delivery/service";
import { RestaurantDTO } from "../../types/restaurant/common";

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

export interface DeliveryDTO {
  id: string;
  transaction_id: string;
  driver_id?: string;
  delivered_at?: Date;
  delivery_status: DeliveryStatus;
  created_at: Date;
  updated_at: Date;
  eta?: Date;
  items: DeliveryItemDTO[];
  cart?: CartDTO;
  order?: OrderDTO;
  restaurant: RestaurantDTO;
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

declare module "@medusajs/types" {
  export interface ModuleImplementations {
    deliveryModuleService: DeliveryModuleService;
  }
}
