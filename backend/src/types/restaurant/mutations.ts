import { RestaurantDTO } from "./common"

export interface CreateRestaurantDTO {
  name: string
  address: string
  phone: string
  email: string
  image?: Buffer
  admin?: CreateRestaurantAdminDTO
}

export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO>

export interface CreateRestaurantAdminDTO {
  email: string
  first_name: string
  last_name: string
  restaurant: RestaurantDTO
}

export interface CreateAdminInviteDTO {
  resadm_id: string
  role?: string | null
  email?: string
}
