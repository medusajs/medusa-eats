import {
  DeliveryDTO,
  DeliveryStatus,
  DriverDTO,
} from "@backend/src/types/delivery/common";
import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import { Badge, Text } from "@medusajs/ui";

async function getDeliveries(query: string) {
  const { deliveries } = await fetch(
    `http://localhost:9000/deliveries?${query}&delivery_status=${DeliveryStatus.DELIVERED}`,
    {
      next: {
        tags: ["deliveries"],
      },
    }
  ).then((res) => res.json());
  return deliveries;
}

export default async function AccountBadge({
  data,
  type,
}: {
  data: DriverDTO | RestaurantDTO;
  type: "driver" | "restaurant";
}) {
  let name = "";
  let query = "";

  if (type === "driver") {
    const driver = data as DriverDTO;
    name = driver.first_name + " " + driver.last_name;
    query = "driver_id=" + driver.id;
  }

  if (type === "restaurant") {
    const restaurant = data as RestaurantDTO;
    name = restaurant.name;
    query = "restaurant_id=" + restaurant.id;
  }

  const deliveries = (await getDeliveries(query)) as DeliveryDTO[];

  return (
    <div className="flex flex-col justify-between">
      <div className="flex gap-4 items-center">
        <div className="flex flex-col text-right justify-between">
          <Text className="font-semibold">{name}</Text>
          <Text>{data.email}</Text>
          <Text>{data.phone}</Text>
          <Badge size="small" className="w-fit self-end">
            Completed deliveries:{" "}
            <span className="font-bold">{deliveries.length}</span>
          </Badge>
        </div>
        <img
          src={"https://robohash.org/" + data.id}
          alt={name}
          className="h-28 rounded-full border-2 border-ui-border-base"
        />
      </div>
    </div>
  );
}
