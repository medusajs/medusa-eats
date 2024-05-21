"use client";

import { ShoppingBag } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";
import { CartCounter } from "./cart-counter";
import CartModal from "./cart-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartButton({ cart }: { cart: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mainElement = window.document.getElementsByTagName("main")[0];

    mainElement.style.filter = "none";
    if (open) {
      mainElement.style.filter = "blur(3px)";
    } else {
      mainElement.style.filter = "none";
    }

    return () => {
      mainElement.style.filter = "none";
    };
  }, [open]);

  const handleCheckoutClick = () => {
    const mainElement = window.document.getElementsByTagName("main")[0];

    mainElement.style.filter = "none";

    setOpen(false);

    router.push("/checkout");
  };

  return (
    <div className="relative">
      <DropdownMenu
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
        open={open}
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
          <CartModal cart={cart} handleCheckoutClick={handleCheckoutClick} />
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
