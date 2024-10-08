import { UserDTO } from "@medusajs/types";
import { sdk } from "../config";
import { getAuthHeaders, getCacheHeaders } from "./cookies";
import { DriverDTO, RestaurantAdminDTO } from "../types";

export async function retrieveUser() {
  try {
    const { user } = await sdk.client.fetch<{
      user: RestaurantAdminDTO | DriverDTO | null;
    }>("/store/users/me", {
      headers: {
        ...getAuthHeaders(),
        ...getCacheHeaders("users"),
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
