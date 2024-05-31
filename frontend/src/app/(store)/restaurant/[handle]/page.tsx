import RestaurantCategories from "@frontend/components/store/restaurant/restaurant-categories";
import { retrieveRestaurantByHandle } from "@frontend/lib/data";
import { Heading, Text } from "@medusajs/ui";
import { notFound } from "next/navigation";

export default async function RestaurantPage({
  params,
}: {
  params: { handle: string };
}) {
  const restaurant = await retrieveRestaurantByHandle(params.handle);

  if (!restaurant) return notFound();

  const categoryProductMap = new Map();

  restaurant.products?.forEach((product) => {
    if (product.categories) {
      product.categories.forEach((category) => {
        if (categoryProductMap.has(category.id)) {
          categoryProductMap.get(category.id).products.push(product);
        } else {
          categoryProductMap.set(category.id, {
            category_name: category.name,
            products: [product],
          });
        }
      });
    }
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Heading level="h1" className="text-2xl">
            {restaurant.name} | Order food online
          </Heading>
          <Text>{restaurant.description}</Text>
        </div>
      </div>
      <RestaurantCategories
        categoryProductMap={categoryProductMap}
        restaurant={restaurant}
      />
    </div>
  );
}
