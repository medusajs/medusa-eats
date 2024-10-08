import { sdk } from "../config";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

export async function listCategories() {
  const { product_categories } = await sdk.store.category.list(
    {},
    {
      ...getAuthHeaders(),
      ...getCacheHeaders("categories"),
    }
  );

  return product_categories;
}
