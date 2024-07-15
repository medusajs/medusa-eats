import { DeliveryDTO, DeliveryStatus } from "@frontend/lib/types";
import { CircleQuarterSolid } from "@medusajs/icons";
import { Badge } from "@medusajs/ui";

export async function DriverDeliveryStatusBadge({
  delivery,
}: {
  delivery: DeliveryDTO;
}) {
  switch (delivery.delivery_status) {
    case DeliveryStatus.RESTAURANT_ACCEPTED:
      return <Badge color="green">Available</Badge>;
    case DeliveryStatus.PICKUP_CLAIMED:
      return (
        <Badge color="purple" className="flex gap-1">
          <CircleQuarterSolid className="animate-spin" />
          Queued
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
        <Badge color="green" className="flex gap-1">
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
    default:
      return <Badge>{delivery.delivery_status}</Badge>;
  }
}
