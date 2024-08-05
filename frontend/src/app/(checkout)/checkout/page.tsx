import CheckoutForm from "@frontend/components/store/checkout/checkout-form";
import { OrderSummary } from "@frontend/components/store/checkout/order-summary";

export default async function CheckoutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 mx-auto gap-4 md:gap-12 justify-center w-full md:w-3/4">
      <div className="md:col-span-3">
        <CheckoutForm />
      </div>
      <div className="md:col-span-2 order-first md:order-last">
        <OrderSummary />
      </div>
    </div>
  );
}
