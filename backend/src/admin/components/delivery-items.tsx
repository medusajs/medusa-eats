import { Heading, Text, Container } from "@medusajs/ui";
import { DeliveryDTO } from "../../types/delivery/common";
import { useEffect, useRef, useState } from "react";

const DeliveryItems = ({ delivery }: { delivery: DeliveryDTO }) => {
  const [hovered, setHovered] = useState(false);

  // on hovering over the items count, set hovered to true
  const handleMouseEnter = () => {
    setHovered(true);
  };

  // on leaving the items count, set hovered to false
  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-context-menu w-full h-full pr-6 py-1 flex items-center"
      >
        <span className="border-b border-ui-fg-muted border-dotted font-medium min-w-2">
          {delivery.items.length}
        </span>
      </div>
      {hovered && (
        <Container className="absolute flex flex-col gap-2 z-50 right-0 w-fit mr-6">
          {delivery.items.map((item) => (
            <DeliveryItem key={item.id} item={item} />
          ))}
        </Container>
      )}
    </>
  );
};

const DeliveryItem = ({ item }: { item: Record<string, any> }) => {
  return (
    <div className="flex items-center gap-4">
      <img
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
            {item.quantity} x ${item.unit_price}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default DeliveryItems;
