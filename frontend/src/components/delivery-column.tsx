import { Heading } from "@medusajs/ui";
import {
  DeliveryDTO,
  DeliveryStatus,
} from "../../../backend/src/types/delivery/common";
import DeliveryCard from "./delivery-card";

export default async function DeliveryColumn({
  title,
  deliveries,
  statusFilters,
}: {
  title: string;
  deliveries: DeliveryDTO[];
  statusFilters: DeliveryStatus[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <Heading className="text-lg text-center">{title}</Heading>
      {deliveries
        .filter((d) => statusFilters.includes(d.delivery_status))
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map((delivery) => (
          <DeliveryCard key={delivery.id} delivery={delivery} />
        ))}
    </div>
  );
}
