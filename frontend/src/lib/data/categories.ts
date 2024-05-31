const BACKEND_URL = "http://localhost:9000";

export async function listCategories() {
  const { categories } = await fetch(
    `${BACKEND_URL}/store/product-categories`,
    {
      next: {
        tags: ["restaurants"],
      },
    }
  ).then((res) => res.json());

  return categories;
}
