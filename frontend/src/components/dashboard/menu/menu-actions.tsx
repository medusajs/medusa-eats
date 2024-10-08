"use client";

import { RestaurantDTO } from "@frontend/lib/types";
import { HttpTypes, ProductCategoryDTO } from "@medusajs/types";
import { CreateCategoryDrawer } from "./create-category-drawer";
import { CreateProductDrawer } from "./create-product-drawer";

export function MenuActions({
  restaurant,
  categories,
}: {
  restaurant: RestaurantDTO;
  categories: HttpTypes.StoreProductCategory[];
}) {
  return (
    <div className="flex gap-4">
      <CreateCategoryDrawer restaurant={restaurant} />
      <CreateProductDrawer restaurant={restaurant} categories={categories} />
    </div>
  );
}
