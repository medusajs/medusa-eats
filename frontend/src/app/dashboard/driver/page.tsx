import { DeliveryStatus } from "@frontend/lib/types";
import AccountBadge from "@frontend/components/dashboard/account-badge";
import DeliveryColumn from "@frontend/components/dashboard/delivery-column";
import RealtimeClient from "@frontend/components/dashboard/realtime-client";
import {
  listDeliveries,
  retrieveDriver,
  retrieveUser,
} from "@frontend/lib/data";
import { Container, Heading, Text } from "@medusajs/ui";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DriverDashboardPage() {
  const user = await retrieveUser();

  if (!user) {
    redirect("/login");
  }

  const driver = await retrieveDriver(user.id);
  const deliveries = await listDeliveries({
    driver_id: driver.id,
  });

  async function revalidateCacheTag(tag: string) {
    "use server";
    revalidateTag(tag);
  }

  return (
    <div className="flex flex-col gap-20">
      <Container className="flex justify-between p-8">
        <div className="flex flex-col justify-between">
          <Heading level="h1" className="text-2xl">
            {driver.first_name} {driver.last_name} | Driver Dashboard
          </Heading>
          <Text>View and manage your Medusa Eats deliveries.</Text>
          <RealtimeClient
            driverId={driver.id}
            revalidate={revalidateCacheTag}
          />
        </div>
        <AccountBadge data={driver} type="driver" />
      </Container>
      <div className="overflow-x-auto whitespace-nowrap ">
        <div className="grid grid-cols-5 gap-4 p-px">
          <DeliveryColumn
            title="Available jobs"
            deliveries={deliveries}
            statusFilters={[DeliveryStatus.RESTAURANT_ACCEPTED]}
            type="driver"
            driver={driver}
          />
          <DeliveryColumn
            title="Claimed jobs"
            deliveries={deliveries}
            statusFilters={[
              DeliveryStatus.PICKUP_CLAIMED,
              DeliveryStatus.RESTAURANT_PREPARING,
            ]}
            type="driver"
            driver={driver}
          />
          <DeliveryColumn
            title="Ready for pickup"
            deliveries={deliveries}
            statusFilters={[DeliveryStatus.READY_FOR_PICKUP]}
            type="driver"
            driver={driver}
          />
          <DeliveryColumn
            title="In transit"
            deliveries={deliveries}
            statusFilters={[DeliveryStatus.IN_TRANSIT]}
            type="driver"
            driver={driver}
          />
          <DeliveryColumn
            title="Completed"
            deliveries={deliveries}
            statusFilters={[DeliveryStatus.DELIVERED]}
            type="driver"
            driver={driver}
          />
        </div>
      </div>
    </div>
  );
}
