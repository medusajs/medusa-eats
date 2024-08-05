"use client";

import { removeItemFromCart } from "@frontend/lib/actions";
import { XMark } from "@medusajs/icons";
import { Button, Container, Heading, IconButton, Text } from "@medusajs/ui";
import Image from "next/image";
import { useState } from "react";

export default function CartModal({
  cart,
  handleCheckoutClick,
}: {
  cart: Record<string, any>;
  handleCheckoutClick: () => void;
}) {
  return (
    <Container className="flex flex-col gap-4 w-fit min-w-72 max-h-[80vh] overflow-y-auto m-0">
      <Heading level="h2" className="text-lg font-semibold text-ui-fg-base">
        Your order
      </Heading>
      <div className="flex flex-col gap-4">
        {cart && cart.items.length ? (
          cart?.items?.map((item: any) => (
            <CartItem key={item.id} item={item} />
          ))
        ) : (
          <Text className="break-words">No items added yet.</Text>
        )}
        <Button
          variant="primary"
          className="w-full"
          size="large"
          onClick={handleCheckoutClick}
          disabled={!cart || cart?.items?.length === 0}
        >
          Go to checkout
        </Button>
      </div>
    </Container>
  );
}

function CartItem({ item }: { item: Record<string, any> }) {
  const [deleting, setDeleting] = useState(false);

  const deleteItem = async (itemId: string) => {
    setDeleting(true);
    await removeItemFromCart(itemId);
    setDeleting(false);
  };

  return (
    <div className="flex items-center gap-4">
      <Image
        src={item.product.thumbnail}
        alt={item.title}
        className="w-16 h-16 rounded-md"
        width={64}
        height={64}
      />
      <div className="flex justify-between w-full gap-2 items-center">
        <div className="flex flex-col gap-2base">
          <Heading level="h3" className="text-sm text-ui-fg-subtle">
            {item.title}
          </Heading>
          <Text className="text-sm text-ui-fg-subtle">
            {item.quantity} x €{item.unit_price}
          </Text>
        </div>
        <IconButton
          onClick={() => deleteItem(item.id)}
          variant="transparent"
          isLoading={deleting}
        >
          <XMark />
        </IconButton>
      </div>
    </div>
  );
}
