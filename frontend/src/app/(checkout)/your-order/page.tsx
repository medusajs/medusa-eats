import AccountBadge from "@frontend/components/dashboard/account-badge";
import RealtimeClient from "@frontend/components/dashboard/realtime-client";
import OrderStatus from "@frontend/components/store/order/order-status";
import {
  retrieveDelivery,
  retrieveDriver,
} from "@frontend/lib/data";
import { Clock } from "@medusajs/icons";
import { Container, Heading, Text } from "@medusajs/ui";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function YourOrderPage() {
  const deliveryId = cookies().get("_medusa_delivery_id")?.value;

  if (!deliveryId) {
    notFound();
  }

  const delivery = await retrieveDelivery(deliveryId);

  if (!delivery) {
    notFound();
  }

  let driver = null;

  if (delivery.driver_id) {
    driver = await retrieveDriver(delivery.driver_id);
  }

  let eta = null;

  if (delivery.eta) {
    eta = new Date(delivery.eta).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    eta = new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const deliveredAt =
    delivery.delivered_at &&
    new Date(delivery.delivered_at).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <Container className="flex justify-between p-8 flex-col md:flex-row gap-3">
        <div className="flex flex-col justify-between gap-2">
          <Heading level="h1" className="text-2xl">
            Your order from {delivery.restaurant.name} | Medusa Eats
          </Heading>
          <Text>View your realtime order status.</Text>
          <RealtimeClient deliveryId={delivery.id} />
        </div>
        {driver && <AccountBadge data={driver} type="driver" />}
        <Container className="flex gap-3 items-center w-fit h-fit p-4 bg-ui-bg-subtle md:self-center">
          <Clock />
          <div className="flex flex-col justify-center">
            <Text className="text-sm text-ui-fg-subtle">
              {deliveredAt ? "Delivered at:" : "Estimated delivery:"}
            </Text>
            <Text className="text-xl">{deliveredAt || eta}</Text>
          </div>
        </Container>
      </Container>
      <section className="flex flex-col justify-between gap-4 h-fit md:flex-row">
        <Container className="flex flex-col gap-4 flex-wrap md:w-1/3 overflow-auto">
          <Heading>Order {delivery.id.slice(-4)}</Heading>
          {delivery.cart?.items?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4 h-fit">
              <Image
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 rounded-md"
                width={64}
                height={64}
              />
              <div className="flex justify-between w-full gap-2 items-center">
                <Text className="text-sm font-semibold text-ui-fg-subtle">
                  {item.title}
                </Text>
                <Text className="text-sm text-ui-fg-subtle text-nowrap">
                  {item.quantity} x €{item.unit_price}
                </Text>
              </div>
            </div>
          ))}
        </Container>
        <OrderStatus delivery={delivery} />
      </section>
    </>
  );
}
