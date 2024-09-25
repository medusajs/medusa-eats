import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Table, Text } from "@medusajs/ui";
import DeliveryRow from "../../components/delivery-row";
import { PizzaIcon } from "../../components/icons";
import { useDeliveries } from "../../hooks";

const Deliveries = () => {
  const { data, loading } = useDeliveries();

  return (
    <Container className="flex flex-col p-0 overflow-hidden">
      <div className="p-6">
        <Heading className="txt-large-plus">Deliveries</Heading>
      </div>
      {loading && <Text>Loading...</Text>}
      {data?.deliveries && (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Delivery</Table.HeaderCell>
              <Table.HeaderCell>Restaurant</Table.HeaderCell>
              <Table.HeaderCell>Items</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.deliveries.map((delivery) => (
              <DeliveryRow key={delivery.id} delivery={delivery} />
            ))}
          </Table.Body>
        </Table>
      )}
      <div className="p-6"></div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Deliveries",
  icon: PizzaIcon,
});

export default Deliveries;
