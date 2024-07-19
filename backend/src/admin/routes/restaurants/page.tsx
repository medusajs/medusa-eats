import { defineRouteConfig } from "@medusajs/admin-shared";
import { Container, Heading, StatusBadge, Table, Text } from "@medusajs/ui";
import ActionsMenu from "../../components/actions-menu";
import { StoreIcon } from "../../components/icons";
import { useRestaurants } from "../../hooks";

const Restaurants = () => {
  const { data, loading } = useRestaurants();

  return (
    <Container className="flex flex-col p-0 overflow-hidden">
      <div className="p-6">
        <Heading className="txt-large-plus">Restaurants</Heading>
      </div>
      {loading && <Text>Loading...</Text>}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {data?.restaurants && (
          <Table.Body>
            {data.restaurants.map((restaurant) => (
              <Table.Row key={restaurant.id}>
                <Table.Cell>{restaurant.name}</Table.Cell>
                <Table.Cell>
                  <StatusBadge color={restaurant.is_open ? "green" : "red"}>
                    {restaurant.is_open ? "Open" : "Closed"}
                  </StatusBadge>
                </Table.Cell>
                <Table.Cell>{restaurant.phone}</Table.Cell>
                <Table.Cell>{restaurant.email}</Table.Cell>
                <Table.Cell>
                  <ActionsMenu />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      <div className="p-6"></div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Restaurants",
  icon: StoreIcon,
});

export default Restaurants;
