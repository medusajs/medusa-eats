"use client";

import { declineDelivery, proceedDelivery } from "@frontend/lib/actions";
import { DeliveryDTO, DeliveryStatus } from "@frontend/lib/types";
import { Button } from "@medusajs/ui";
import { useState } from "react";

export default function RestaurantDeliveryButtons({
  delivery,
}: {
  delivery: DeliveryDTO;
}) {
  const [proceedIsLoading, setProceedIsLoading] = useState(false);
  const [declineIsLoading, setDeclineIsLoading] = useState(false);

  const handleProceedDelivery = async () => {
    setProceedIsLoading(true);
    await proceedDelivery(delivery);
  };

  const handleDeclineDelivery = async () => {
    setDeclineIsLoading(true);
    await declineDelivery(delivery.id);
  };

  return (
    <>
      {delivery.delivery_status === DeliveryStatus.PENDING && (
        <Button
          variant="transparent"
          onClick={handleDeclineDelivery}
          isLoading={declineIsLoading}
        >
          Decline
        </Button>
      )}
      {[
        DeliveryStatus.PENDING,
        DeliveryStatus.PICKUP_CLAIMED,
        DeliveryStatus.RESTAURANT_PREPARING,
      ].includes(delivery.delivery_status) && (
        <Button
          variant="primary"
          onClick={handleProceedDelivery}
          isLoading={proceedIsLoading}
        >
          {delivery.delivery_status === DeliveryStatus.PENDING &&
            "Accept order"}
          {delivery.delivery_status === DeliveryStatus.PICKUP_CLAIMED &&
            "Start preparing"}
          {delivery.delivery_status === DeliveryStatus.RESTAURANT_PREPARING &&
            "Set ready for pickup"}
        </Button>
      )}
    </>
  );
}
