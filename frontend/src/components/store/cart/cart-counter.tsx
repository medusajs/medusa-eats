"use client";

import { Text, clx } from "@medusajs/ui";

export function CartCounter({ cart }: { cart: any }) {
  const numberOfItems = cart?.items?.length || 0;

  return (
    <Text
      key={numberOfItems}
      className={clx(
        "absolute flex bottom-2 right-2 rounded-full bg-ui-bg-base group-hover:bg-ui-fg-base group-hover:text-ui-bg-base p-1 h-4 w-4 items-center justify-center text-[10px]",
        {
          "animate-bounce duration-300 repeat-1": numberOfItems > 0,
        }
      )}
    >
      {numberOfItems}
    </Text>
  );
}
