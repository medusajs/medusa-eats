"use client";

import { Button, Container, Heading, Text } from "@medusajs/ui";
import Image from "next/image";
import { Link } from "next-view-transitions";

export default function CartModal({
  cart,
  handleCheckoutClick,
}: {
  cart: Record<string, any>;
  handleCheckoutClick: () => void;
}) {
  console.log("CartModal", cart);
  return (
    <Container className="flex flex-col gap-4 w-fit min-w-72 max-h-[80vh] overflow-y-scroll m-0">
      <Heading level="h2" className="text-lg font-semibold text-ui-fg-base">
        Your order
      </Heading>
      <div className="flex flex-col gap-4">
        {cart?.items?.map((item: any) => (
          <div key={item.id} className="flex items-center gap-4">
            <Image
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 rounded-md"
              width={64}
              height={64}
            />
            <div className="flex flex-col gap-2base">
              <Heading level="h3" className="text-sm text-ui-fg-subtle">
                {item.title}
              </Heading>
              <Text className="text-sm text-ui-fg-subtle">
                {item.quantity} x ${item.unit_price / 100}
              </Text>
            </div>
          </div>
        ))}
        <Button
          variant="primary"
          className="w-full"
          size="large"
          onClick={handleCheckoutClick}
        >
          Go to checkout
        </Button>
      </div>
    </Container>
  );
}
