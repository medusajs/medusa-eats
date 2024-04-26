import { DeliveryStatus } from "../../../../../backend/src/types/delivery/common";
import AccountBadge from "@frontend/components/dashboard/account-badge";
import DeliveryColumn from "@frontend/components/dashboard/delivery-column";
import RealtimeClient from "@frontend/components/dashboard/realtime-client";
import { listDeliveries, retrieveDriver } from "@frontend/lib/data";
import { Container, Heading, Text } from "@medusajs/ui";
import { revalidateTag } from "next/cache";

export default async function RestaurantDashboardPage() {
  const driverId = "drv_01HTWA9HAFANF85QP26TC3E6C1";
  const driver = await retrieveDriver(driverId);
  const deliveries = await listDeliveries({
    driver_id: driverId,
  });

  async function revalidateCacheTag(tag: string) {
    "use server";
    console.log("revalidating cache tag", tag);
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
          <RealtimeClient driverId={driverId} revalidate={revalidateCacheTag} />
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
