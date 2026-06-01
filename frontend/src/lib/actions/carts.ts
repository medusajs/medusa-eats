"use server";

import {retrieveUser} from "@frontend/lib/data";
import {HttpTypes} from "@medusajs/types";
import {revalidateTag} from "next/cache";
import {cookies as getCookies} from "next/headers";
import {sdk} from "../config";
import {getAuthHeaders, getCacheTag} from "../data/cookies";

export async function createCart(
  data: HttpTypes.StoreCreateCart,
  restaurant_id: string
): Promise<HttpTypes.StoreCart> {
  const user = await retrieveUser();
  const {regions} = await sdk.store.region.list();
  const region = regions[0];

  const body = {
    email: user?.email,
    region_id: region.id,
    metadata: {restaurant_id},
    ...data
  } as HttpTypes.StoreCreateCart & {
    items: HttpTypes.StoreAddCartLineItem[];
  };

  try {
    const {cart} = await sdk.store.cart.create(
      body,
      {},
      {
        ...(await getAuthHeaders())
      }
    );

    const cookies = await getCookies();
    cookies.set("_medusa_cart_id", cart.id);

    revalidateTag(await getCacheTag("carts"));

    return cart;
  } catch (e) {
    throw e;
  }
}

export async function addToCart(
  variantId: string,
  restaurantId: string
): Promise<HttpTypes.StoreCart | {message: string}> {
  const cookies = await getCookies();
  let cartId = cookies.get("_medusa_cart_id")?.value;
  let cart;

  if (!cartId) {
    cart = await createCart({currency_code: "eur"}, restaurantId);
    cartId = cart?.id;
  }

  if (!cartId) {
    return {message: "Error creating cart"};
  }

  try {
    const {cart} = await sdk.store.cart.createLineItem(cartId, {
      variant_id: variantId,
      quantity: 1
    });

    revalidateTag(await getCacheTag("carts"));

    return cart as HttpTypes.StoreCart;
  } catch (error) {
    return {message: "Error adding item to cart"};
  }
}

export async function removeItemFromCart(
  lineItemId: string
): Promise<void | {message: string}> {
  try {
    const cookies = await getCookies();
    const cartId = cookies.get("_medusa_cart_id")?.value;

    if (!cartId) {
      return {message: "Error removing item from cart"};
    }

    await sdk.store.cart.deleteLineItem(cartId, lineItemId);

    revalidateTag(await getCacheTag("carts"));
  } catch (error) {
    return {message: "Error removing item from cart"};
  }
}
