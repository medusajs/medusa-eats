import CheckoutForm from "@frontend/components/store/checkout/checkout-form";
import { OrderSummary } from "@frontend/components/store/checkout/order-summary";

export default async function CheckoutPage() {
  return (
    <div className="flex mx-auto gap-12 w-3/4">
      <CheckoutForm />
      <OrderSummary />
    </div>
  );
}
