import { RestaurantDTO } from "../restaurant/common"
import { CartDTO } from "@medusajs/types"

export interface CreateDeliveryDTO {
  restaurant: RestaurantDTO
  cart: CartDTO
  delivery_address: string
}

export interface UpdateDeliveryDTO {
  order_id?: string
  delivery_status?:
    | "pending"
    | "preparing"
    | "ready_for_pickup"
    | "in_transit"
    | "delivered"
  delivery_address?: string
  eta?: Date
  delivered_at?: Date
}

export interface CreateDriverDTO {
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar?: string
}
