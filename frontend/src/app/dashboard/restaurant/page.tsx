import AccountBadge from "@frontend/components/dashboard/account-badge";
import DeliveryColumn from "@frontend/components/dashboard/delivery-column";
import RealtimeClient from "@frontend/components/dashboard/realtime-client";
import RestaurantStatus from "@frontend/components/dashboard/restaurant/restaurant-status";
import { retrieveRestaurant, retrieveUser } from "@frontend/lib/data";
import { DeliveryStatus, RestaurantAdminDTO } from "@frontend/lib/types";
import { Container, Heading, StatusBadge, Text } from "@medusajs/ui";
import { Link } from "next-view-transitions";
import { notFound, redirect } from "next/navigation";

export default async function RestaurantDashboardPage() {
  const user = (await retrieveUser()) as RestaurantAdminDTO;

  if (!user || !user.id.includes("resadm_")) {
    redirect("/login");
  }

  if (!user.restaurant_id) {
    return notFound();
  }

  const restaurantId = user.restaurant_id;
  const restaurant = await retrieveRestaurant(restaurantId);
  const { name, deliveries, is_open } = restaurant;

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Heading level="h1" className="text-2xl">
            {name} | Restaurant Dashboard
          </Heading>
          <Text>View and manage your restaurant&apos;s orders.</Text>
        </div>
        <Container className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-8 gap-4">
          <div className="flex flex-col justify-between gap-2">
            <Text className="font-semibold">Restaurant Status</Text>
            <div className="flex gap-2">
              <Text>Restaurant status: </Text>{" "}
              <StatusBadge
                color={is_open ? "green" : "red"}
                className="flex pl-1 pr-2 py-1 gap-1 w-fit"
              >
                {is_open ? "Taking orders" : "Closed"}
              </StatusBadge>
              <RestaurantStatus restaurant={restaurant} />
            </div>
            <div className="flex gap-2">
              <Text>Connection status: </Text>{" "}
              <RealtimeClient restaurantId={restaurantId} />
            </div>
          </div>
          <div className="justify-center hidden md:flex">
            {process.env.NEXT_PUBLIC_DEMO_MODE !== "true" && (
              <div className="flex flex-col justify-between">
                <Text className="font-semibold">Quick actions</Text>
                <Link
                  href="/dashboard/restaurant/menu"
                  className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover text-sm"
                >
                  Edit menu
                </Link>
                <Text
                  className="text-ui-fg-disabled text-sm"
                  aria-disabled={true}
                >
                  Edit settings
                </Text>
                <Text
                  className="text-ui-fg-disabled text-sm"
                  aria-disabled={true}
                >
                  Edit profile
                </Text>
              </div>
            )}
          </div>
          <div className="flex md:justify-end">
            <AccountBadge data={restaurant} type="restaurant" />
          </div>
        </Container>
      </div>

      <div className="overflow-x-auto whitespace-nowrap">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-px">
          <DeliveryColumn
            title="Incoming orders"
            deliveries={deliveries}
            statusFilters={[
              DeliveryStatus.PENDING,
              DeliveryStatus.RESTAURANT_ACCEPTED,
            ]}
            type="restaurant"
          />
          <DeliveryColumn
            title="Ready to prepare"
            deliveries={deliveries}
            statusFilters={[DeliveryStatus.PICKUP_CLAIMED]}
            type="restaurant"
          />
          <DeliveryColumn
            title="Preparing"
            deliveries={deliveries}
            statusFilters={[DeliveryStatus.RESTAURANT_PREPARING]}
            type="restaurant"
          />
          <DeliveryColumn
            title="In transit"
            deliveries={deliveries}
            statusFilters={[
              DeliveryStatus.READY_FOR_PICKUP,
              DeliveryStatus.IN_TRANSIT,
            ]}
            type="restaurant"
          />
          <DeliveryColumn
            title="Completed"
            deliveries={deliveries}
            statusFilters={[
              DeliveryStatus.DELIVERED,
              DeliveryStatus.RESTAURANT_DECLINED,
            ]}
            type="restaurant"
          />
        </div>
      </div>
    </>
  );
}
