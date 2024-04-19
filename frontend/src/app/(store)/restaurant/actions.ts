"use server";

//@ts-ignore
import { CartDTO, CreateCartDTO } from "@medusajs/medusa/dist/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:9000";

export async function createCart(data: CreateCartDTO): Promise<CartDTO> {
  try {
    const cart = await fetch(`${BACKEND_URL}/carts`, {
      method: "POST",
      body: JSON.stringify(data),
      next: {
        tags: ["cart"],
      },
    })
      .then((res) => res.json())
      .then(({ carts }) => carts[0]);

    console.log("createCart", cart);

    cookies().set("_medusa_cart_id", cart.id);

    revalidateTag("cart");

    return cart;
  } catch (error) {
    console.log("Error from createCart");
    console.log(error);
  }
}

export async function addToCart(productId: string): Promise<void> {
  let cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    const cart = await createCart({});
    cartId = cart.id;
  }

  if (!cartId) {
    return;
  }

  try {
    await fetch(`${BACKEND_URL}/carts/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
      next: {
        tags: ["cart"],
      },
    });

    revalidateTag("cart");
  } catch (error) {
    console.log(error);
  }
}