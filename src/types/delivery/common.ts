import { CartDTO, OrderDTO } from "@medusajs/types"
import { RestaurantDTO } from "../restaurant/common"

export interface DeliveryDTO {
  id: string
  driver?: DriverDTO
  cart?: CartDTO
  order?: OrderDTO
  restaurant: RestaurantDTO
  delivered_at?: Date
  delivery_address: string
  delivery_status:
    | "pending"
    | "preparing"
    | "ready_for_pickup"
    | "in_transit"
    | "delivered"
  created_at: Date
  updated_at: Date
}

export interface DriverDTO {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  avatar?: string
  created_at: Date
  updated_at: Date
}
