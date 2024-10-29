import { DeliveryDTO, DeliveryStatus, DriverDTO } from "@frontend/lib/types";
import { Container, Heading, Text } from "@medusajs/ui";
import DeliveryCard from "./delivery-card";

export default async function DeliveryColumn({
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
  const columnDeliveries = deliveries?.filter(
    (d) => d && statusFilters?.includes(d.delivery_status)
  );

  return (
    <div className="inline-block w-full">
      <div className="flex flex-col gap-4 w-full">
        <Heading className="text-lg text-center">{title}</Heading>
        {columnDeliveries?.length > 0 ? (
          columnDeliveries.map((delivery) => (
            <DeliveryCard
              delivery={delivery}
              type={type}
              driver={driver}
              key={delivery.id}
            />
          ))
        ) : (
          <Container className="p-4 whitespace-pre-wrap">
            <Text className="break-words">{title} will show up here</Text>
          </Container>
        )}
      </div>
    </div>
  );
}
