"use client";

import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import { ProductDTO } from "@medusajs/types";
import { Button, Heading } from "@medusajs/ui";
import { RefObject, createRef, useEffect, useState } from "react";
import DishCard from "./dish-card";

export default function RestaurantCategories({
  categoryProductMap,
  restaurant,
}: {
  categoryProductMap: Map<string, any>;
  restaurant: RestaurantDTO;
}) {
  const [categoryRefs, setCategoryRefs] = useState<RefObject<HTMLDivElement>[]>(
    []
  );

  useEffect(() => {
    setCategoryRefs((prevRefs) =>
      Array.from(categoryProductMap).map(
        ([_, category], idx) => prevRefs[idx] || createRef()
      )
    );
  }, [categoryProductMap]);

  const scrollIntoView = (idx: number) =>
    categoryRefs.length > 0 &&
    categoryRefs[idx]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 min-w-64">
        {Array.from(categoryProductMap).map(([_, category], idx) => (
          <Button
            key={"button_" + category.id}
            variant="transparent"
            onClick={() => scrollIntoView(idx)}
          >
            {category.category_name}
          </Button>
        ))}
      </div>
      <div className="flex flex-col w-full gap-8">
        {Array.from(categoryProductMap).map(([categoryId, category], idx) => (
          <div
            key={categoryId}
            className="flex flex-col gap-4"
            id={`cat_${idx}`}
            ref={categoryRefs[idx]}
          >
            <Heading level="h2" className="text-xl">
              {category.category_name}
            </Heading>
            <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
              {category.products?.map((product: ProductDTO) => (
                <DishCard
                  product={product}
                  key={product.id}
                  restaurantId={restaurant.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
