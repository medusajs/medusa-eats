import { DeliveryDTO, DriverDTO } from "@backend/src/types/delivery/common";
import { RestaurantDTO } from "@backend/src/types/restaurant/common";

const BACKEND_URL = "http://localhost:9000";

export async function retrieveRestaurant(
  restaurantId: string
): Promise<RestaurantDTO> {
  const { restaurant } = await fetch(
    `${BACKEND_URL}/restaurants/${restaurantId}`,
    {
      next: {
        tags: ["restaurants"],
      },
    }
  ).then((res) => res.json());
  return restaurant;
}

export async function retrieveDriver(driverId: string): Promise<DriverDTO> {
  const { driver } = await fetch(`${BACKEND_URL}/drivers/${driverId}`, {
    next: {
      tags: ["drivers"],
    },
  }).then((res) => res.json());
  return driver;
}

export async function listDeliveries(
  filter?: Record<string, string>
): Promise<DeliveryDTO[]> {
  const query = new URLSearchParams(filter).toString();

  const { deliveries } = await fetch(`${BACKEND_URL}/deliveries?${query}`, {
    next: {
      tags: ["deliveries"],
    },
  }).then((res) => res.json());
  return deliveries;
}
