"use server";

import { UpsertAddressDTO } from "@medusajs/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sdk } from "../config";
import { retrieveCart } from "../data";
import { getAuthHeaders, getCacheTag } from "../data/cookies";
import { DeliveryDTO } from "../types";

export async function updateCart(data: Record<string, unknown>) {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    throw new Error("No cart found");
  }

  const response = await sdk.store.cart.update(
    cartId,
    data,
    {},
    {
      ...getAuthHeaders(),
    }
  );

  revalidateTag(getCacheTag("carts"));

  return response;
}

export async function completeCart() {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    throw new Error("No cart found");
  }

  const response = await sdk.store.cart.complete(
    cartId,
    {},
    {
      ...getAuthHeaders(),
    }
  );

  revalidateTag(getCacheTag("carts"));

  return response;
}

export async function addPaymentSession(cartId: string) {
  const cart = await retrieveCart(cartId);

  const res = await sdk.store.payment.initiatePaymentSession(
    cart,
    {},
    undefined,
    {
      ...getAuthHeaders(),
    }
  );

  return res;
}

export async function createDelivery(cartId: string, restaurantId: string) {
  const { delivery } = await sdk.client.fetch<{
    delivery: DeliveryDTO;
  }>("/store/deliveries", {
    method: "POST",
    body: { cart_id: cartId, restaurant_id: restaurantId },
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  revalidateTag(getCacheTag("deliveries"));

  return delivery;
}

export async function placeOrder(prevState: any, data: FormData) {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    return { message: "No cart found" };
  }

  const firstName = data.get("first-name")?.toString();
  const lastName = data.get("last-name")?.toString();
  const address = data.get("address")?.toString();
  const city = data.get("city")?.toString();
  const zip = data.get("zip")?.toString();
  const phone = data.get("phone")?.toString();
  const email = data.get("email")?.toString();
  const restaurantId = data.get("restaurant-id")?.toString();

  if (
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !zip ||
    !phone ||
    !email ||
    !restaurantId
  ) {
    return { message: "Please fill in all fields" };
  }

  const shippingAddress: UpsertAddressDTO = {
    first_name: firstName,
    last_name: lastName,
    address_1: address,
    city,
    postal_code: zip,
    phone,
  };

  try {
    const updatedCart = await updateCart({
      shipping_address: shippingAddress,
    });

    if (!updatedCart) {
      return { message: "Error updating cart" };
    }

    const delivery = await createDelivery(cartId, restaurantId);

    cookies().set("_medusa_cart_id", "", { maxAge: 0 });
    cookies().set("_medusa_delivery_id", delivery.id);
  } catch (error) {
    return { message: "Error placing order" };
  }

  redirect("/your-order");
}
