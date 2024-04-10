"use client";

import { EllipsisHorizontal, PencilSquare, Plus, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { ProductDTO } from "@medusajs/types";

export function MenuProductActions({ product }: { product: ProductDTO }) {
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
        <DropdownMenu.Item className="gap-x-2">
          <Trash className="text-ui-fg-subtle" />
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
