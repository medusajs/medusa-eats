import CheckoutForm from "@frontend/components/store/checkout/checkout-form";
import { OrderSummary } from "@frontend/components/store/checkout/order-summary";

export default async function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 md:gap-12 md:w-3/4 justify-center w-full">
      <CheckoutForm />
      <OrderSummary />
    </div>
  );
}
