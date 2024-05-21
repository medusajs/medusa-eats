import { DeliveryDTO, DriverDTO } from "@backend/src/types/delivery/common";
import { RestaurantDTO } from "@backend/src/types/restaurant/common";
import { CartDTO, CartLineItemDTO } from "@medusajs/types";
import { retrieveSession } from "./sessions";

export const BACKEND_URL = "http://localhost:9000";

export async function retrieveRestaurant(
  restaurantId: string
): Promise<RestaurantDTO> {
  const { restaurant } = await fetch(
    `${BACKEND_URL}/restaurants/${restaurantId}`,
    {
      next: {
        tags: ["restaurants"],
      },
    }
  ).then((res) => res.json());
  return restaurant;
}

export async function retrieveDriver(driverId: string): Promise<DriverDTO> {
  const { driver } = await fetch(`${BACKEND_URL}/drivers/${driverId}`, {
    next: {
      tags: ["drivers"],
    },
  }).then((res) => res.json());
  return driver;
}

export async function listDeliveries(
  filter?: Record<string, string>
): Promise<DeliveryDTO[]> {
  const query = new URLSearchParams(filter).toString();

  const { deliveries } = await fetch(`${BACKEND_URL}/deliveries?${query}`, {
    next: {
      tags: ["deliveries"],
    },
  }).then((res) => res.json());

  return deliveries;
}

export async function listCategories() {
  const { categories } = await fetch(`${BACKEND_URL}/categories`, {
    next: {
      tags: ["restaurants"],
    },
  }).then((res) => res.json());

  return categories;
}

export async function retrieveRestaurantByHandle(
  handle: string
): Promise<RestaurantDTO> {
  const { restaurants } = await fetch(
    `${BACKEND_URL}/restaurants?handle=${handle}`,
    {
      next: {
        tags: ["restaurants"],
      },
    }
  ).then((res) => res.json());
  return restaurants[0];
}

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

export async function retrieveUser() {
  const token = retrieveSession();

  if (!token) {
    return null;
  }

  const { user } = await fetch(`${BACKEND_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["user"],
    },
  }).then((res) => {
    return res.json();
  });

  return user;
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
