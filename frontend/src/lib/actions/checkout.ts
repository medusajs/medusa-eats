"use server";

import { listDeliveries } from "@frontend/lib/data";
import { UpsertAddressDTO } from "@medusajs/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";

export async function updateCart(data: Record<string, unknown>) {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    throw new Error("No cart found");
  }

  const response = await fetch(`${BACKEND_URL}/store/carts/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch(() => {
    throw new Error("Error updating cart");
  });

  return response;
}

export async function completeCart() {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    throw new Error("No cart found");
  }

  const response = await fetch(
    `${BACKEND_URL}/store/carts/${cartId}/complete`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  ).catch((error) => {
    throw new Error("Error completing cart");
  });

  return response;
}

export async function addPaymentSession(cartId: string) {
  const response = await fetch(
    `${BACKEND_URL}/store/carts/${cartId}/payment-sessions`,
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      throw new Error("Error adding payment session");
    });

  return response;
}

export async function createDelivery(cartId: string) {
  const delivery = await fetch(`${BACKEND_URL}/deliveries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart_id: cartId }),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error("Error creating delivery");
    });

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

  if (
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !zip ||
    !phone ||
    !email
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
    })
      .then((res) => res.json())
      .catch((error) => {
        return { message: "Error updating cart" };
      });

    await createDelivery(cartId);

    const delivery = await listDeliveries({ cart_id: cartId }).then(
      (res) => res[0]
    );

    cookies().set("_medusa_cart_id", "", { maxAge: 0 });
    cookies().set("_medusa_delivery_id", delivery.id);
  } catch (error) {
    return { message: "Error placing order" };
  }

  redirect("/your-order");
}
