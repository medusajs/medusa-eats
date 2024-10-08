import { sdk } from "../config";
import { RestaurantDTO } from "../types";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

// const BACKEND_URL =
//   process.env.BACKEND_URL ||
//   process.env.NEXT_PUBLIC_BACKEND_URL ||
//   "http://localhost:9000";

// export async function retrieveRestaurant(
//   restaurantId: string
// ): Promise<RestaurantDTO> {
//   const { restaurant } = await fetch(
//     `${BACKEND_URL}/restaurants/${restaurantId}`,
//     {
//       next: {
//         tags: ["restaurants"],
//       },
//     }
//   ).then((res) => res.json());
//   return restaurant;
// }

// export async function listRestaurants(
//   filter?: Record<string, string>
// ): Promise<RestaurantDTO[]> {
//   const query = new URLSearchParams(filter).toString();

//   const { restaurants } = await fetch(`${BACKEND_URL}/restaurants?${query}`, {
//     next: {
//       tags: ["restaurants"],
//     },
//   }).then((res) => res.json());

//   return restaurants;
// }

// export async function retrieveRestaurantByHandle(
//   handle: string
// ): Promise<RestaurantDTO> {
//   const { restaurants } = await fetch(
//     `${BACKEND_URL}/restaurants?handle=${handle}`,
//     {
//       next: {
//         tags: ["restaurants"],
//       },
//     }
//   ).then((res) => {
//     return res.json();
//   });

//   return restaurants[0];
// }

export async function retrieveRestaurant(
  restaurantId: string
): Promise<RestaurantDTO> {
  const { restaurant }: { restaurant: RestaurantDTO } = await sdk.client.fetch(
    `/store/restaurants/${restaurantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("restaurants"),
      },
    }
  );

  return restaurant;
}

export async function listRestaurants(
  filter?: Record<string, string>
): Promise<RestaurantDTO[]> {
  const query = new URLSearchParams(filter).toString();

  const { restaurants }: { restaurants: RestaurantDTO[] } =
    await sdk.client.fetch(`/store/restaurants?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("restaurants"),
      },
    });

  return restaurants;
}

export async function retrieveRestaurantByHandle(
  handle: string
): Promise<RestaurantDTO> {
  const { restaurants }: { restaurants: RestaurantDTO[] } =
    await sdk.client.fetch(`/store/restaurants?handle=${handle}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("restaurants"),
      },
    });

  return restaurants[0];
}
