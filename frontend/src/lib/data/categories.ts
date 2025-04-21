import {HttpTypes} from "@medusajs/types";
import {sdk} from "../config";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export async function listCategories(): Promise<
  HttpTypes.StoreProductCategory[]
> {
  const [authHeaders, cacheHeaders] = await Promise.all([
    getAuthHeaders(),
    getCacheHeaders("categories")
  ]);

  const {product_categories} = await sdk.store.category.list(
    {},
    {
      ...authHeaders,
      ...cacheHeaders
    }
  );

  return product_categories as HttpTypes.StoreProductCategory[];
}
