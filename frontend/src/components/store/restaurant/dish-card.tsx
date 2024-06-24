"use client";

import { ProductDTO } from "@medusajs/types";
import { Heading, Text } from "@medusajs/ui";
import { IconButton } from "@medusajs/ui";
import { Plus } from "@medusajs/icons";
import Image from "next/image";
import { addToCart } from "@frontend/lib/actions";
import { useState } from "react";

export default function DishCard({
  product,
  restaurantId,
}: {
  product: ProductDTO;
  restaurantId: string;
}) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    await addToCart(product.variants[0].id, restaurantId);
    setIsAdding(false);
  };

  return (
    <div className="flex items-center justify-between shadow-sm border rounded-xl">
      <div className="flex flex-col gap-2 p-4">
        <Heading>{product.title}</Heading>
        <Text>{product.description}</Text>
        <Text className="text-lg font-semibold">
          $
          {
            //@ts-ignore
            product.variants[0].price?.calculated_amount / 100
          }
        </Text>
      </div>
      <div className="relative">
        <Image
          src={product.thumbnail!}
          width={100}
          height={100}
          alt={`Thumbnail of ${product.title}`}
          className="min-w-40 bg-ui-bg-base rounded-r-lg"
        />
        <IconButton
          isLoading={isAdding}
          onClick={handleAdd}
          size="large"
          className="absolute right-3 bottom-3 rounded-full bg-ui-bg-base"
        >
          <Plus />
        </IconButton>
      </div>
    </div>
  );
}
