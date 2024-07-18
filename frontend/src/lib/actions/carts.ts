"use server";

import { retrieveUser } from "@frontend/lib/data";
import { CartDTO, CreateCartDTO } from "@medusajs/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";

export async function createCart(
  data: CreateCartDTO,
  restaurant_id: string
): Promise<CartDTO | undefined> {
  const user = await retrieveUser();

  const { regions } = await fetch(`${BACKEND_URL}/store/regions`).then((res) =>
    res.json()
  );

  console.log({ regions });

  const region = regions[0];

  const body = {
    email: user?.email || null,
    region_id: region.id,
    ...data,
  };

  console.log({ body });

  let cart;

  try {
    let cartResponse = await fetch(`${BACKEND_URL}/store/carts`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["cart"],
      },
    }).then((res) => res.json());

    cart = cartResponse.cart;

    cartResponse = await fetch(
      `${BACKEND_URL}/restaurants/${restaurant_id}/carts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cart.id,
        }),
      }
    ).then((res) => res.json());

    cart = cartResponse.cart;

    cookies().set("_medusa_cart_id", cart.id);

    revalidateTag("cart");

    return cart as CartDTO;
  } catch (e) {
    throw e;
  }
}

export async function addToCart(
  variantId: string,
  restaurantId: string
): Promise<CartDTO | { message: string }> {
  let cartId = cookies().get("_medusa_cart_id")?.value;
  let cart;

  if (!cartId) {
    cart = await createCart(
      {
        currency_code: "EUR",
      },
      restaurantId
    );

    cartId = cart?.id;
  }

  if (!cartId) {
    return { message: "Error creating cart" };
  }

  try {
    cart = await fetch(`${BACKEND_URL}/store/carts/${cartId}/line-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variant_id: variantId,
        quantity: 1,
      }),
      next: {
        tags: ["cart"],
      },
    }).then((res) => res.json());

    revalidateTag("cart");

    return cart;
  } catch (error) {
    return { message: "Error adding item to cart" };
  }
}

export async function removeItemFromCart(
  lineItemId: string
): Promise<CartDTO | { message: string }> {
  try {
    const cartId = cookies().get("_medusa_cart_id")?.value;

    const cart = await fetch(
      `${BACKEND_URL}/store/carts/${cartId}/line-items/${lineItemId}`,
      {
        method: "DELETE",
        next: {
          tags: ["cart"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("cart");
    return cart;
  } catch (error) {
    return { message: "Error removing item from cart" };
  }
}
