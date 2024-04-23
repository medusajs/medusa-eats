import { Container, Heading, Table } from "@medusajs/ui";
import {
  DeliveryDTO,
  DriverDTO,
} from "../../../../backend/src/types/delivery/common";
import DriverDeliveryButtons from "./driver/delivery-buttons";
import RestaurantDeliveryButtons from "./restaurant/delivery-buttons";
import { DriverDeliveryStatusBadge } from "./driver/delivery-status-badge";
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
  return (
    <Container className="flex flex-col gap-6 p-4 shadow-elevation-card-rest hover:shadow-elevation-card-hover">
      <div className="flex justify-between gap-2 flex-wrap">
        <Heading className="text-large font-bold">
          Order {delivery.id.slice(-4)}
        </Heading>
        {type === "driver" && <DriverDeliveryStatusBadge delivery={delivery} />}
        {type === "restaurant" && (
          <RestaurantDeliveryStatusBadge delivery={delivery} />
        )}
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell className="text-right max-w-8 min-w-8">
              Quantity
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {delivery.items?.map((item) => (
            <Table.Row key={delivery.transaction_id.slice(-4) + "_" + item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell className="text-right">{item.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
