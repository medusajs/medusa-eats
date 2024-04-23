"use client";

import { RestaurantDTO } from "../../../../../backend/src/types/restaurant/common";
import { ProductCategoryDTO } from "@medusajs/types";
import { CreateCategoryDrawer } from "./create-category-drawer";
import { CreateProductDrawer } from "./create-product-drawer";

export function MenuActions({
  restaurant,
  categories,
}: {
  restaurant: RestaurantDTO;
  categories: ProductCategoryDTO[];
}) {
  return (
    <div className="flex gap-4">
      <CreateCategoryDrawer restaurant={restaurant} />
      <CreateProductDrawer restaurant={restaurant} categories={categories} />
    </div>
  );
}
