import { RestaurantDTO } from "@frontend/lib/types";
import { ClockSolidMini } from "@medusajs/icons";
import { Badge } from "@medusajs/ui";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function RestaurantCategory({
  restaurants,
  categoryName,
}: {
  restaurants: RestaurantDTO[];
  categoryName?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">{categoryName}Popular near you</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Link
            href={`restaurant/${restaurant.handle}`}
            key={restaurant.id}
            className="bg-ui-bg-base rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out max-w-2xl min-w-fit"
          >
            {restaurant.image_url && (
              <Image
                src={restaurant.image_url}
                alt={restaurant.name}
                className="object-cover h-48 w-full rounded-t-lg"
                width={400}
                height={400}
              />
            )}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex justify-between">
                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                <Badge size="xsmall" className="min-w-fit">
                  <ClockSolidMini />
                  10-20 min
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{restaurant.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
