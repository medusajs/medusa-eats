"use server";

import { retrieveUser } from "@frontend/lib/data";
//@ts-ignore
import { CreateCartDTO } from "@medusajs/cart";
import { CartDTO } from "@medusajs/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:9000";

export async function createCart(
  data: CreateCartDTO,
  restaurant_id: string
): Promise<CartDTO | undefined> {
  const user = await retrieveUser();

  const body = {
    email: user?.email || null,
    ...data,
  };

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
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error from createCart");
        console.log(error);
      });

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
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error from createCart");
        console.log(error);
      });

    cart = cartResponse.cart;

    cookies().set("_medusa_cart_id", cart.id);

    revalidateTag("cart");

    return cart as CartDTO;
  } catch (error) {
    console.log("Error from createCart");
    console.log(error);
  }
}

export async function addToCart(
  variantId: string,
  restaurantId: string
): Promise<CartDTO | undefined> {
  let cartId = cookies().get("_medusa_cart_id")?.value;
  let cart;

  if (!cartId) {
    cart = await createCart(
      {
        sales_channel_id: "sc_01HYFTMPT6QGF9AKCGN62CTTEV",
        currency_code: "usd",
      },
      restaurantId
    );

    cartId = cart?.id;
  }

  if (!cartId) {
    return;
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
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error from addToCart");
        console.log(error);
      });

    revalidateTag("cart");
    return cart;
  } catch (error) {
    console.log(error);
  }
}

export async function removeItemFromCart(
  lineItemId: string
): Promise<CartDTO | undefined> {
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
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("Error from removeItemFromCart");
        console.log(error);
      });

    revalidateTag("cart");
    return cart;
  } catch (error) {
    console.log(error);
  }
}
