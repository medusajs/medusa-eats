import CheckoutForm from "@frontend/components/store/checkout/checkout-form";
import { OrderSummary } from "@frontend/components/store/checkout/order-summary";
import { retrieveCart } from "@frontend/lib/data";
import { HttpTypes } from "@medusajs/types";
import { cookies } from "next/headers";

export default async function CheckoutPage() {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    return null;
  }

  const cart = (await retrieveCart(cartId)) as HttpTypes.StoreCart;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 mx-auto gap-4 md:gap-12 justify-center w-full md:w-3/4">
      <div className="md:col-span-3">
        <CheckoutForm cart={cart} />
      </div>
      <div className="md:col-span-2 order-first md:order-last">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}
