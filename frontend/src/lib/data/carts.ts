import {sdk} from "../config";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export async function retrieveCart(cartId: string) {
  const [authHeaders, cacheHeaders] = await Promise.all([
    getAuthHeaders(),
    getCacheHeaders("carts")
  ]);

  const {cart} = await sdk.store.cart.retrieve(
    cartId,
    {
      fields:
        "+metadata, +items.*, +items.thumbnail, +items.title, +items.quantity, +items.total, +items.variant"
    },
    {
      ...authHeaders,
      ...cacheHeaders
    }
  );

  return cart;
}
