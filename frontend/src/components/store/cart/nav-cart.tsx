import { retrieveCart } from "@frontend/lib/data";
import { cookies } from "next/headers";
import CartButton from "./cart-button";

export default async function NavCart() {
  const cartId = cookies().get("_medusa_cart_id")?.value;
  let cart;

  if (cartId) {
    cart = await retrieveCart(cartId);
  }

  return (
    <div className="relative">
      <CartButton cart={cart} />
    </div>
  );
}
