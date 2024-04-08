const productCategoriesData = [
  {
    id: "category-0",
    name: "category 0",
    parent_category_id: null,
  },
  {
    id: "category-1",
    name: "category 1",
    parent_category_id: "category-0",
  },
  {
    id: "category-1-a",
    name: "category 1 a",
    parent_category_id: "category-1",
  },
  {
    id: "category-1-b",
    name: "category 1 b",
    parent_category_id: "category-1",
    is_internal: true,
  },
  {
    id: "category-1-b-1",
    name: "category 1 b 1",
    parent_category_id: "category-1-b",
  },
]

const productsData = [
  {
    id: "test-1",
    title: "product 1",
    status: "published",
    descriptions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed",
    tags: [
      {
        id: "tag-1",
        value: "Europe",
      },
    ],
    categories: [
      {
        id: "category-0",
      },
    ],
  },
  {
    id: "test-2",
    title: "product",
    status: "published",
    descriptions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed",
    tags: [
      {
        id: "tag-2",
        value: "North America",
      },
    ],
    categories: [
      {
        id: "category-1",
      },
    ],
  },
]

const variantsData = [
  {
    id: "test-1",
    title: "variant title",
    sku: "sku 1",
    product: { id: productsData[0].id },
    inventory_quantity: 10,
  },
  {
    id: "test-2",
    title: "variant title",
    sku: "sku 2",
    product: { id: productsData[1].id },
    inventory_quantity: 10,
  },
]

module.exports = {
  productCategoriesData,
  productsData,
  variantsData,
}
