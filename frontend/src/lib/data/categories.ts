import { HttpTypes } from "@medusajs/types";
import { sdk } from "../config";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

export async function listCategories(): Promise<
  HttpTypes.StoreProductCategory[]
> {
  const { product_categories } = await sdk.store.category.list(
    {},
    {
      ...getAuthHeaders(),
      ...getCacheHeaders("categories"),
    }
  );

  return product_categories as HttpTypes.StoreProductCategory[];
}
