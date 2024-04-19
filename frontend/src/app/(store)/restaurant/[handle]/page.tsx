import DishCard from "@frontend/components/store/restaurant/dish-card";
import { retrieveRestaurantByHandle } from "@frontend/lib/data";
import { ProductDTO } from "@medusajs/types";
import { Button, Heading, Text } from "@medusajs/ui";
import Link from "next/link";
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
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 min-w-64">
          {Array.from(categoryProductMap).map(([_, category], idx) => (
            <Link href={`#cat_${idx}`}>
              <Button variant="transparent">{category.category_name}</Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-col w-full gap-8">
          {Array.from(categoryProductMap).map(([categoryId, category], idx) => (
            <div
              key={categoryId}
              className="flex flex-col gap-4"
              id={`#cat_${idx}`}
            >
              <Heading level="h2" className="text-xl">
                {category.category_name}
              </Heading>
              <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                {category.products?.map((product: ProductDTO) => (
                  <DishCard product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
