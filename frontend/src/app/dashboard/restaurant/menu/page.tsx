import { MenuActions } from "@frontend/components/dashboard/menu/menu-actions";
import { MenuProductActions } from "@frontend/components/dashboard/menu/menu-product-actions";
import {
  listCategories,
  retrieveRestaurant,
  retrieveUser,
} from "@frontend/lib/data";
import { ProductDTO, ProductVariantDTO } from "@medusajs/types";
import { Heading, Table, Text } from "@medusajs/ui";
import Image from "next/image";

export default async function MenuPage() {
  const user = await retrieveUser();
  const restaurantId = user.restaurant_id;

  const restaurant = await retrieveRestaurant(restaurantId);
  const categories = await listCategories();

  const categoryProductMap = new Map();

  restaurant?.products?.forEach((product) => {
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
          <Text>View and manage your restaurant&apos;s menu</Text>
        </div>
        <MenuActions restaurant={restaurant} categories={categories} />
      </div>
      {Array.from(categoryProductMap).map(([categoryId, category]) => (
        <div key={categoryId} className="flex flex-col gap-4">
          <Heading level="h2" className="text-xl">
            {category.category_name}
          </Heading>
          <Table className="table-fixed">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Thumbnail</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {category.products?.map((product: ProductDTO) => {
                const variants = product.variants as (ProductVariantDTO & {
                  price_set: any;
                  price: any;
                })[];
                return (
                  <Table.Row key={product.id}>
                    <Table.Cell>
                      {product.thumbnail && (
                        <Image
                          src={product.thumbnail}
                          className="h-12 w-12 rounded-md m-2"
                          width={48}
                          height={48}
                          alt={`Thumbnail for ${product.title}`}
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell>{product.title}</Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                    <Table.Cell>
                      ${variants[0].price.calculated_amount}
                    </Table.Cell>
                    <Table.Cell>
                      <MenuProductActions
                        product={product}
                        restaurant={restaurant}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  );
}
