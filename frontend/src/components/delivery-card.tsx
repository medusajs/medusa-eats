import { Container, Heading, Table } from "@medusajs/ui";
import { DeliveryDTO } from "../../../backend/src/types/delivery/common";
import DeliveryButtons from "./delivery-buttons";
import { DeliveryStatusBadge } from "./delivery-status-badge";

export default async function DeliveryCard({
  delivery,
}: {
  delivery: DeliveryDTO;
}) {
  return (
    <Container className="flex flex-col gap-6 p-4">
      <div className="flex justify-between">
        <Heading className="text-large font-bold">
          Order {delivery.id.slice(-4)}
        </Heading>
        <DeliveryStatusBadge delivery={delivery} />
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {delivery.items?.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex gap-4 justify-end">
        <DeliveryButtons delivery={delivery} />
      </div>
    </Container>
  );
}
