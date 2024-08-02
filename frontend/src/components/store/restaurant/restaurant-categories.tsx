"use client";

import { RestaurantDTO } from "@frontend/lib/types";
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
    <div className="flex gap-4 flex-col md:flex-row w-full">
      <div className="overflow-x-scroll w-screen md:w-fit z-30 bg-white sticky top-16 max-h-[calc(100vh-4rem)] scrollbar-hide ml-[-1rem]">
        <div className="flex flex-row md:flex-col gap-2 py-2 px-4 min-w-64 w-fit h-full">
          {Array.from(categoryProductMap).map(([_, category], idx) => (
            <Button
              key={"button_" + "cat_" + idx}
              variant="transparent"
              onClick={() => scrollIntoView(idx)}
            >
              {category.category_name}
            </Button>
          ))}
        </div>
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
