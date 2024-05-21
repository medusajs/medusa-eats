"use server";

import { retrieveUser } from "@frontend/lib/data";
//@ts-ignore
import { CartDTO, CreateCartDTO } from "@medusajs/medusa/dist/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:9000";

export async function createCart(
  data: CreateCartDTO,
  restaurant_id: string
): Promise<CartDTO> {
  const user = await retrieveUser();

  const body = {
    email: user?.email || null,
    ...data,
  };

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

    let cart = cartResponse.cart;

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

    return cart;
  } catch (error) {
    console.log("Error from createCart");
    console.log(error);
  }
}

export async function addToCart(
  variantId: string,
  restaurantId: string
): Promise<CartDTO> {
  let cartId = cookies().get("_medusa_cart_id")?.value;
  let cart;

  if (!cartId) {
    cart = await createCart(
      {
        currency_code: "usd",
      },
      restaurantId
    );
    cartId = cart.id;
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
      .then((res) => console.log("res", res))
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
