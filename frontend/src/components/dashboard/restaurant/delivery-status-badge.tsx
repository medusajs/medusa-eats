import { DeliveryDTO, DeliveryStatus } from "@frontend/lib/types";
import { CircleQuarterSolid } from "@medusajs/icons";
import { Badge } from "@medusajs/ui";

export async function RestaurantDeliveryStatusBadge({
  delivery,
}: {
  delivery: DeliveryDTO;
}) {
  switch (delivery.delivery_status) {
    case DeliveryStatus.PENDING:
      return <Badge color="green">New order</Badge>;
    case DeliveryStatus.RESTAURANT_ACCEPTED:
      return (
        <Badge color="purple" className="flex gap-1">
          <CircleQuarterSolid className="animate-spin" />
          Looking for driver
        </Badge>
      );
    case DeliveryStatus.PICKUP_CLAIMED:
      return (
        <Badge size="small" color="blue">
          Driver found
        </Badge>
      );
    case DeliveryStatus.RESTAURANT_PREPARING:
      return (
        <Badge color="purple" className="flex gap-1">
          <CircleQuarterSolid className="animate-spin" />
          Preparing
        </Badge>
      );
    case DeliveryStatus.READY_FOR_PICKUP:
      return (
        <Badge color="purple" className="flex gap-1">
          <CircleQuarterSolid className="animate-spin" />
          Waiting for pickup
        </Badge>
      );
    case DeliveryStatus.IN_TRANSIT:
      return (
        <Badge color="purple" className="flex gap-1">
          <CircleQuarterSolid className="animate-spin" />
          Out for delivery
        </Badge>
      );
    case DeliveryStatus.DELIVERED:
      return <Badge color="green">Delivered</Badge>;
    case DeliveryStatus.RESTAURANT_DECLINED:
      return <Badge color="red">Declined by restaurant</Badge>;
    default:
      return <Badge>{delivery.delivery_status}</Badge>;
  }
}
