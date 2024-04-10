"use client";

import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import { ProductDTO } from "@medusajs/types";
import { CreateCategoryDrawer } from "./create-category-drawer";
import { CreateProductDrawer } from "./create-product-drawer";

export function MenuActions({
  restaurant,
  categoryProductMap,
}: {
  restaurant: RestaurantDTO;
  categoryProductMap: Map<
    string,
    { category_name: string; products: ProductDTO[] }
  >;
}) {
  const categories = Array.from(categoryProductMap).map(
    ([categoryId, category]) => ({
      id: categoryId,
      name: category.category_name,
    })
  );

  return (
    <div className="flex gap-4">
      <CreateCategoryDrawer restaurant={restaurant} />
      <CreateProductDrawer restaurant={restaurant} categories={categories} />
    </div>
  );
}
