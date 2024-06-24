import { RestaurantDTO } from "./common";

export interface CreateRestaurantDTO {
  name: string;
  address: string;
  phone: string;
  email: string;
  image?: Buffer;
  admin?: CreateRestaurantAdminDTO;
  is_open?: boolean;
}

export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO>;

export interface CreateRestaurantAdminDTO {
  email: string;
  first_name: string;
  last_name: string;
  restaurant_id: string;
}

export interface CreateAdminInviteDTO {
  resadm_id: string;
  role?: string | null;
  email?: string;
}
