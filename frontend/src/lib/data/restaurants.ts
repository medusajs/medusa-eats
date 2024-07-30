import { RestaurantDTO } from "@frontend/lib/types";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9000";

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

export async function listRestaurants(
  filter?: Record<string, string>
): Promise<RestaurantDTO[]> {
  const query = new URLSearchParams(filter).toString();

  const { restaurants } = await fetch(`${BACKEND_URL}/restaurants?${query}`, {
    next: {
      tags: ["restaurants"],
    },
  }).then((res) => res.json());

  return restaurants;
}

export async function retrieveRestaurantByHandle(
  handle: string
): Promise<RestaurantDTO> {
  const { restaurants } = await fetch(
    `${BACKEND_URL}/restaurants?handle=${handle}`,
    {
      next: {
        tags: ["restaurants"],
      },
    }
  ).then((res) => {
    return res.json();
  });

  return restaurants[0];
}
