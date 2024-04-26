"use client";

import { ShoppingBag } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { CartCounter } from "./cart-counter";
import CartModal from "./cart-modal";

export default function CartButton({ cart }: { cart: any }) {
  return (
    <div className="relative">
      <DropdownMenu
        onOpenChange={(isOpen) => {
          const mainElement = window.document.getElementsByTagName("main")[0];
          if (isOpen) {
            mainElement.style.filter = "blur(3px)";
          } else {
            mainElement.style.filter = "none";
          }
        }}
      >
        <DropdownMenu.Trigger
          asChild
          className="relative group flex items-center gap-2"
        >
          <IconButton size="xlarge" variant="transparent">
            <ShoppingBag
              className="text-ui-tag-green-bg hover:text-ui-tag-green-icon group-hover:text-ui-tag-green-icon"
              viewBox="2 2 18 18"
              height={28}
              width={28}
            />
            <CartCounter cart={cart} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="border-none p-0 m-0 mt-1">
          <CartModal cart={cart} />
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
