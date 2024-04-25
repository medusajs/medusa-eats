"use server";

//@ts-ignore
import { CartDTO, CreateCartDTO } from "@medusajs/medusa/dist/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:9000";

export async function createCart(data: CreateCartDTO): Promise<CartDTO> {
  try {
    const { cart } = await fetch(`${BACKEND_URL}/store/carts`, {
      method: "POST",
      body: JSON.stringify(data),
      next: {
        tags: ["cart"],
      },
    }).then((res) => res.json());

    console.log("createCart", cart);

    cookies().set("_medusa_cart_id", cart.id);

    revalidateTag("cart");

    return cart;
  } catch (error) {
    console.log("Error from createCart");
    console.log(error);
  }
}

export async function addToCart(variantId: string): Promise<CartDTO> {
  console.log("variantId", variantId);
  let cartId = cookies().get("_medusa_cart_id")?.value;
  let cart;

  if (!cartId) {
    cart = await createCart({});
    console.log("cart", cart);
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
      body: JSON.stringify({ variant_id: variantId, quantity: 1 }),
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

    console.log("addToCart", cart);

    revalidateTag("cart");
    return cart;
  } catch (error) {
    console.log(error);
  }
}
