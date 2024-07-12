export interface CreateRestaurantDTO {
  name: string;
  handle: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
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
