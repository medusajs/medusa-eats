import { listDeliveries, retrieveRestaurant } from "@frontend/lib/data";
import { cookies } from "next/headers";
import { Container, Heading, Text, ProgressTabs } from "@medusajs/ui";
import Image from "next/image";
import RealtimeClient from "@frontend/components/dashboard/realtime-client";
import { revalidateTag } from "next/cache";
import OrderStatus from "@frontend/components/store/order/order-status";

async function revalidateCacheTag(tag: string) {
  "use server";
  console.log("revalidating cache tag", tag);
  revalidateTag(tag);
}

export default async function YourOrderPage() {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    return null;
  }

  const delivery = await listDeliveries({ cart_id: cartId }).then(
    (res) => res[0]
  );

  const restaurant = await retrieveRestaurant(delivery.restaurant_id);

  return (
    <>
      <Container className="flex justify-between p-8">
        <div className="flex flex-col justify-between gap-2">
          <Heading level="h1" className="text-2xl">
            Your order from {restaurant.name} | Medusa Eats
          </Heading>
          <Text>View your realtime order status.</Text>
          <RealtimeClient
            deliveryId={delivery.id}
            revalidate={revalidateCacheTag}
          />
        </div>
      </Container>
      <section className="flex justify-between gap-4">
        <Container className="flex gap-4 flex-wrap w-1/3">
          {delivery.items.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4">
              <Image
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 rounded-md"
                width={64}
                height={64}
              />
              <Text className="text-sm font-semibold text-ui-fg-subtle">
                {item.title}
              </Text>
              <Text className="text-sm text-ui-fg-subtle">
                {item.quantity} x ${item.unit_price / 100}
              </Text>
            </div>
          ))}
        </Container>
        <OrderStatus delivery={delivery} />
      </section>
    </>
  );
}
