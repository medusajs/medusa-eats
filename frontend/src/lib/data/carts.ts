import { CartDTO, CartLineItemDTO } from "@medusajs/types";

const BACKEND_URL = "http://localhost:9000";

export async function retrieveCart(cartId: string) {
  const { cart } = (await fetch(`${BACKEND_URL}/store/carts/${cartId}`, {
    next: {
      tags: ["cart"],
    },
  }).then((res) => res.json())) as { cart: CartDTO };

  const {
    cart: { metadata },
  } = await fetch(`${BACKEND_URL}/store/carts/${cartId}?fields=metadata`, {
    next: {
      tags: ["cart"],
    },
  }).then((res) => res.json());

  cart.metadata = metadata;

  if (cart.items) {
    const enrichedItems = await enrichLineItems(cart.items);
    cart.items = enrichedItems;
  }

  return cart;
}

// todo: this is a hacky way to get the thumbnail, we should have a better way to get the thumbnail
export async function getThumbnails(queryParams: Record<string, any>) {
  const query = new URLSearchParams(queryParams).toString();

  const { products } = await fetch(`${BACKEND_URL}/products?${query}`, {
    next: {
      tags: ["products"],
    },
  }).then((res) => res.json());

  return products;
}

export async function enrichLineItems(
  lineItems: CartLineItemDTO[]
): Promise<CartLineItemDTO[] | undefined> {
  // Prepare query parameters
  const queryParams = {
    id: lineItems.map((lineItem) => lineItem.product_id!),
  };

  // Fetch products by their IDs
  const productThumbnail = await getThumbnails(queryParams);
  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !productThumbnail) {
    return [];
  }

  // Enrich line items with thumbn
  const enrichedItems = lineItems.map((item) => {
    const product = productThumbnail.find((p: any) => p.id === item.product_id);
    item.thumbnail = product.thumbnail;
    return item;
  }) as CartLineItemDTO[];

  return enrichedItems;
}
