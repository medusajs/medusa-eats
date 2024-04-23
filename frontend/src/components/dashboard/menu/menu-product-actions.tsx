"use client";

import {
  EllipsisHorizontal,
  PencilSquare,
  Spinner,
  Trash,
} from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { ProductDTO } from "@medusajs/types";
import { RestaurantDTO } from "../../../../../backend/src/types/restaurant/common";
import { deleteProduct } from "@frontend/app/dashboard/restaurant/actions";
import { useState } from "react";

export function MenuProductActions({
  product,
  restaurant,
}: {
  product: ProductDTO;
  restaurant: RestaurantDTO;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProduct(product.id, restaurant.id);
    setIsDeleting(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton>
          <EllipsisHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item className="gap-x-2">
          <PencilSquare className="text-ui-fg-subtle" />
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="gap-x-2" onClick={handleDelete}>
          {isDeleting ? (
            <Spinner className="animate-spin" />
          ) : (
            <Trash className="text-ui-fg-subtle" />
          )}
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
