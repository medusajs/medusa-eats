import {
  DeliveryDTO,
  DeliveryStatus,
} from "@backend/src/types/delivery/common";
import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import DeliveryColumn from "@frontend/components/delivery-column";
import { Heading, Text } from "@medusajs/ui";

async function getRestaurant(restaurantId: string): Promise<RestaurantDTO> {
  const { restaurant } = await fetch(
    `http://localhost:9000/restaurants/${restaurantId}`,
    {
      next: {
        tags: ["restaurants"],
      },
    }
  ).then((res) => res.json());
  return restaurant;
}

async function getDeliveries(restaurantId: string): Promise<DeliveryDTO[]> {
  const { deliveries } = await fetch(
    `http://localhost:9000/deliveries?restaurant_id=${restaurantId}`,
    {
      next: {
        tags: ["deliveries"],
      },
    }
  ).then((res) => res.json());
  return deliveries;
}

export default async function RestaurantDashboardPage() {
  const restaurantId = "res_01HTPT6ATT6J2CBJ1C3A7D18YJ";
  const restaurant = await getRestaurant(restaurantId);
  const deliveries = await getDeliveries(restaurantId);

  console.log(deliveries.map((d) => d.id));

  return (
    <div className="flex flex-col gap-8 p-10 mx-20">
      <div>
        <Heading level="h1" className="text-xl">
          {restaurant.name} | Dashboard
        </Heading>
        <Text>View and manage your restaurant's orders</Text>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <DeliveryColumn
          title="Incoming orders"
          deliveries={deliveries}
          statusFilters={[
            DeliveryStatus.PENDING,
            DeliveryStatus.RESTAURANT_ACCEPTED,
          ]}
        />
        <DeliveryColumn
          title="Ready to prepare"
          deliveries={deliveries}
          statusFilters={[DeliveryStatus.PICKUP_CLAIMED]}
        />
        <DeliveryColumn
          title="Preparing"
          deliveries={deliveries}
          statusFilters={[DeliveryStatus.RESTAURANT_PREPARING]}
        />
        <DeliveryColumn
          title="In transit"
          deliveries={deliveries}
          statusFilters={[
            DeliveryStatus.READY_FOR_PICKUP,
            DeliveryStatus.IN_TRANSIT,
          ]}
        />
        <DeliveryColumn
          title="Completed"
          deliveries={deliveries}
          statusFilters={[
            DeliveryStatus.DELIVERED,
            DeliveryStatus.RESTAURANT_DECLINED,
          ]}
        />
      </div>
    </div>
  );
}
