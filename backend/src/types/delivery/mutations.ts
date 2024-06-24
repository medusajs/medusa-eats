import { DeliveryDTO, DriverDTO } from "./common";

export interface CreateDeliveryDTO {
  restaurant_id: string;
  cart_id: string;
}

export interface UpdateDeliveryDTO extends Partial<DeliveryDTO> {
  id: string;
}

export interface CreateDriverDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
}

export interface UpdateDriverDTO extends Partial<DriverDTO> {
  id: string;
}

export interface CreateDeliveryDriverDTO {
  delivery_id: string;
  driver_id: string;
}
