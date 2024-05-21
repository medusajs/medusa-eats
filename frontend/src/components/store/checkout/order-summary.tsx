import { CartDTO, CartLineItemDTO } from "@medusajs/types";
import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import { retrieveCart, retrieveRestaurant } from "@frontend/lib/data";
import { cookies } from "next/headers";
import { Container, Heading, Text } from "@medusajs/ui";
import Image from "next/image";

export async function OrderSummary() {
  const cartId = cookies().get("_medusa_cart_id")?.value;
  if (!cartId) {
    return null;
  }
  const cart = await retrieveCart(cartId);

  console.log({ cart });

  const restaurant = await retrieveRestaurant(
    cart.metadata?.restaurant_id as string
  );

  return (
    <Container className="w-1/2 flex flex-col gap-4">
      <Heading
        level="h2"
        className="text-lg font-semibold text-ui-fg-base text-center"
      >
        Your order from {restaurant.name}
      </Heading>
      <div className="flex gap-4 justify-between flex-wrap">
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
        <div className="w-full border-t border-ui-fg-muted"></div>
        <div className="flex justify-between w-full">
          <Text className="text-md text-ui-fg-subtle">Order total</Text>
          <Text className="text-base text-ui-fg-subtle">
            $
            {
              //@ts-ignore
              cart.total / 100
            }
          </Text>
        </div>
      </div>
    </Container>
  );
}
