"use client";

import { DeliveryDTO } from "@backend/src/types/delivery/common";
import { DeliveryStatus } from "@backend/src/types/delivery/common";
import { Container, ProgressTabs } from "@medusajs/ui";

/* Order statuses 
PENDING = "pending",
RESTAURANT_DECLINED = "restaurant_declined",
RESTAURANT_ACCEPTED = "restaurant_accepted",
PICKUP_CLAIMED = "pickup_claimed",
RESTAURANT_PREPARING = "restaurant_preparing",
READY_FOR_PICKUP = "ready_for_pickup",
IN_TRANSIT = "in_transit",
DELIVERED = "delivered",
*/

const getStatus = (status: DeliveryStatus) => {
  switch (status) {
    case DeliveryStatus.PENDING:
      return 0;
    case DeliveryStatus.RESTAURANT_ACCEPTED:
      return 1;
    case DeliveryStatus.PICKUP_CLAIMED:
      return 2;
    case DeliveryStatus.RESTAURANT_PREPARING:
      return 3;
    case DeliveryStatus.READY_FOR_PICKUP:
      return 4;
    case DeliveryStatus.IN_TRANSIT:
      return 5;
    case DeliveryStatus.DELIVERED:
      return 6;
    default:
      return 0;
  }
};

export default function OrderStatus({ delivery }: { delivery: DeliveryDTO }) {
  const delivery_status = getStatus(delivery.delivery_status);
  return (
    <Container className="w-2/3 p-0 overflow-hidden">
      <ProgressTabs defaultValue="order-received">
        <ProgressTabs.List>
          <ProgressTabs.Trigger
            disabled={delivery_status !== 0}
            value="order-received"
            status={delivery_status === 0 ? "in-progress" : "completed"}
          >
            {delivery_status === 0 ? "Order received" : "Order confirmed"}
          </ProgressTabs.Trigger>
          <ProgressTabs.Trigger
            disabled={delivery_status !== 1}
            value="find-driver"
            status={
              delivery_status === 1
                ? "in-progress"
                : delivery_status > 1
                ? "completed"
                : "not-started"
            }
          >
            {delivery_status <= 1 ? "Finding driver" : "Driver found"}
          </ProgressTabs.Trigger>
          <ProgressTabs.Trigger
            disabled={!(delivery_status >= 2 && delivery_status <= 3)}
            value="prepare-order"
            status={
              delivery_status === 3
                ? "in-progress"
                : delivery_status > 3
                ? "completed"
                : "not-started"
            }
          >
            {delivery_status <= 3 ? "Preparing order" : "Order prepared"}
          </ProgressTabs.Trigger>
          <ProgressTabs.Trigger
            disabled={delivery_status !== 4}
            value="pickup"
            status={
              delivery_status === 4
                ? "in-progress"
                : delivery_status > 4
                ? "completed"
                : "not-started"
            }
          >
            {delivery_status <= 4 ? "Ready for pickup" : "Picked up"}
          </ProgressTabs.Trigger>
          <ProgressTabs.Trigger
            disabled={delivery_status !== 5}
            value="delivery"
            status={
              delivery_status === 5
                ? "in-progress"
                : delivery_status > 5
                ? "completed"
                : "not-started"
            }
          >
            {delivery_status <= 5 ? "In transit" : "Delivered"}
          </ProgressTabs.Trigger>
        </ProgressTabs.List>
        <ProgressTabs.Content value="order-received">
          {/* Content */}
        </ProgressTabs.Content>
        <ProgressTabs.Content value="find-driver">
          {/* Content */}
        </ProgressTabs.Content>
        <ProgressTabs.Content value="prepare-order">
          {/* Content */}
        </ProgressTabs.Content>
        <ProgressTabs.Content value="pickup">
          {/* Content */}
        </ProgressTabs.Content>
        <ProgressTabs.Content value="delivery">
          {/* Content */}
        </ProgressTabs.Content>
      </ProgressTabs>
    </Container>
  );
}
