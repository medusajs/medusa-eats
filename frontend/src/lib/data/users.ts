import { UserDTO } from "@medusajs/types";
import { sdk } from "../config";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

export async function retrieveUser() {
  try {
    const { user } = await sdk.client.fetch<{
      user: UserDTO;
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
