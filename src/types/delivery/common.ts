export interface DeliveryDTO {
  id: string
  transaction_id: string
  driver_id?: string
  cart_id?: string
  order_id?: string
  restaurant_id: string
  delivered_at?: Date
  delivery_address: string
  delivery_status:
    | "pending"
    | "declined"
    | "accepted"
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
