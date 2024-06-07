import { IModuleService, ProductDTO } from "@medusajs/types";
import {
  CreateRestaurantDTO,
  CreateRestaurantAdminDTO,
  UpdateRestaurantDTO,
} from "./mutations";

export interface IRestaurantModuleService extends IModuleService {
  addProductToRestaurant(data: RestaurantProductDTO): Promise<void>;
  listRestaurants(filter?: any, options?: any): Promise<RestaurantDTO[]>;
  listRestaurantAdmins(
    filter?: any,
    options?: any
  ): Promise<RestaurantAdminDTO[]>;
  listRestaurantProducts(filter: any): Promise<RestaurantProductDTO[]>;
  createRestaurant(data: CreateRestaurantDTO): Promise<RestaurantDTO>;
  createRestaurantAdmin(
    data: CreateRestaurantAdminDTO
  ): Promise<RestaurantAdminDTO>;
  retrieveRestaurant(restaurantId: string): Promise<RestaurantDTO>;
  retrieveRestaurantAdmin(adminId: string): Promise<RestaurantAdminDTO>;
  updateRestaurant(
    restaurantId: string,
    data: UpdateRestaurantDTO
  ): Promise<RestaurantDTO>;
  updateRestaurantAdmin(
    adminId: string,
    data: Partial<RestaurantAdminDTO>
  ): Promise<RestaurantAdminDTO>;
  deleteRestaurant(restaurantId: string): Promise<void>;
  deleteRestaurantAdmin(adminId: string): Promise<void>;
  removeProductFromRestaurant(data: RestaurantProductDTO): Promise<void>;
}

export interface RestaurantDTO {
  id: string;
  handle: string;
  is_open: boolean;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  products?: ProductDTO[];
}

export interface RestaurantAdminDTO {
  id: string;
  restaurant: RestaurantDTO;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface RestaurantProductDTO {
  restaurant_id: string;
  product_id: string;
}
