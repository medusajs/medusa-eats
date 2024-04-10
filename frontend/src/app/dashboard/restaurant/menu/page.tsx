import { MenuActions } from "@frontend/components/dashboard/menu/menu-actions";
import { MenuProductActions } from "@frontend/components/dashboard/menu/menu-product-actions";
import { retrieveRestaurant } from "@frontend/lib/data";
import { ProductDTO } from "@medusajs/types";
import { Heading, Table, Text } from "@medusajs/ui";

export default async function MenuPage() {
  const restaurantId = "res_01HTPT6ATT6J2CBJ1C3A7D18YJ";
  const restaurant = await retrieveRestaurant(restaurantId);

  const categoryProductMap = new Map();

  restaurant.products?.forEach((product) => {
    if (product.categories) {
      product.categories.forEach((category) => {
        if (categoryProductMap.has(category.id)) {
          categoryProductMap.get(category.id).products.push(product);
        } else {
          categoryProductMap.set(category.id, {
            category_name: category.name,
            products: [product],
          });
        }
      });
    }
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Heading level="h1" className="text-2xl">
            {restaurant.name} | Menu Dashboard
          </Heading>
          <Text>View and manage your restaurant's menu</Text>
        </div>
        <MenuActions
          restaurant={restaurant}
          categoryProductMap={categoryProductMap}
        />
      </div>
      {Array.from(categoryProductMap).map(([categoryId, category]) => (
        <div key={categoryId} className="flex flex-col gap-4">
          <Heading level="h2" className="text-xl">
            {category.category_name}
          </Heading>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {category.products?.map((product: ProductDTO) => (
                <Table.Row key={product.id}>
                  <Table.Cell>
                    {product.thumbnail && <img src={product.thumbnail} />}
                  </Table.Cell>
                  <Table.Cell>{product.title}</Table.Cell>
                  <Table.Cell>{product.description}</Table.Cell>
                  <Table.Cell>
                    <MenuProductActions product={product} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  );
}
