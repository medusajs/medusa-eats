import {sdk} from "../config";
import {getAuthHeaders, getCacheHeaders} from "./cookies";
import {DriverDTO, RestaurantAdminDTO} from "../types";

export async function retrieveUser() {
  try {
    const [authHeaders, cacheHeaders] = await Promise.all([
      getAuthHeaders(),
      getCacheHeaders("users")
    ]);

    const {user} = await sdk.client.fetch<{
      user: RestaurantAdminDTO | DriverDTO | null;
    }>("/store/users/me", {
      headers: {
        ...authHeaders,
        ...cacheHeaders
      }
    });

    return user;
  } catch (error) {
    console.info(error);
    return null;
  }
}
