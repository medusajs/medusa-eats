import { RestaurantDTO } from "@frontend/lib/types";
import RestaurantCategory from "@frontend/components/store/restaurant/restaurant-category";
import { Heading } from "@medusajs/ui";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9000";

export default async function Home() {
  const restaurants = await fetch(BACKEND_URL + "/restaurants")
    .then((res) => res.json())
    .then(({ restaurants }: { restaurants: RestaurantDTO[] }) =>
      restaurants.filter((restaurant: RestaurantDTO) => restaurant.is_open)
    );

  if (!restaurants) {
    return <Heading level="h1">No restaurants open near you</Heading>;
  }

  return <RestaurantCategory restaurants={restaurants} />;
}
