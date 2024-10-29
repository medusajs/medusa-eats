import { DeliveryDTO, DriverDTO } from "@frontend/lib/types";
import { Container, Heading, Table } from "@medusajs/ui";
import DriverDeliveryButtons from "./driver/delivery-buttons";
import { DriverDeliveryStatusBadge } from "./driver/delivery-status-badge";
import RestaurantDeliveryButtons from "./restaurant/delivery-buttons";
import { RestaurantDeliveryStatusBadge } from "./restaurant/delivery-status-badge";

export default async function DeliveryCard({
  delivery,
  driver,
  type,
}: {
  delivery: DeliveryDTO;
  driver?: DriverDTO;
  type: "restaurant" | "driver";
}) {
  if (!delivery || delivery === null) return null;

  const items = delivery.order?.items || delivery.cart?.items;

  return (
    <Container className="flex flex-col gap-6 p-4 shadow-elevation-card-rest hover:shadow-elevation-card-hover w-full">
      <div className="flex justify-between gap-2 flex-wrap">
        <Heading className="text-large font-bold">
          Order {delivery.id.slice(-4)}
        </Heading>
        {type === "driver" && <DriverDeliveryStatusBadge delivery={delivery} />}
        {type === "restaurant" && (
          <RestaurantDeliveryStatusBadge delivery={delivery} />
        )}
      </div>
      <div className="flex gap-4 overflow-auto max-w-full">
        <Table className="overflow-auto w-full">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Items</Table.HeaderCell>
              <Table.HeaderCell className="text-right max-w-8"></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items?.map((item) => (
              <Table.Row
                key={delivery.transaction_id.slice(-4) + "_" + item.id}
              >
                <Table.Cell className="text-wrap">{item.title}</Table.Cell>
                <Table.Cell className="text-right">
                  {item.quantity as number}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex gap-4 justify-end">
        {type === "driver" && driver && (
          <DriverDeliveryButtons delivery={delivery} driver={driver} />
        )}
        {type === "restaurant" && (
          <RestaurantDeliveryButtons delivery={delivery} />
        )}
      </div>
    </Container>
  );
}
