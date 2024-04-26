import { Heading } from "@medusajs/ui";
import {
  DeliveryDTO,
  DeliveryStatus,
  DriverDTO,
} from "@backend/src/types/delivery/common";
import DeliveryCard from "./delivery-card";

export default async function CompletedGrid({
  title,
  deliveries,
  statusFilters,
  driver,
  type,
}: {
  title: string;
  deliveries: DeliveryDTO[];
  statusFilters?: DeliveryStatus[];
  driver?: DriverDTO;
  type: "restaurant" | "driver";
}) {
  return (
    <div className="flex gap-4">
      <Heading className="text-lg text-center">{title}</Heading>
      {deliveries
        .filter((d) => statusFilters?.includes(d.delivery_status))
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        .map((delivery) => (
          <DeliveryCard
            delivery={delivery}
            type={type}
            driver={driver}
            key={delivery.id}
          />
        ))}
    </div>
  );
}
