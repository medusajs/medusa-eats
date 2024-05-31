import { CartLineItemDTO, OrderLineItemDTO } from "@medusajs/types"

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
  id: string
  transaction_id: string
  driver_id?: string
  cart_id?: string
  order_id?: string
  restaurant_id: string
  delivered_at?: Date
  delivery_status: DeliveryStatus
  created_at: Date
  updated_at: Date
  eta?: Date
  items: DeliveryItemDTO[]
}

export type DeliveryItemDTO = (CartLineItemDTO | OrderLineItemDTO) & {
  quantity: number
}

export interface DriverDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar_url?: string
  created_at: Date
  updated_at: Date
}

export interface DeliveryDriverDTO {
  delivery_id: string
  driver_id: string
}
