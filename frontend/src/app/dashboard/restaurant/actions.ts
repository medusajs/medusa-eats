"use server";

import {
  DeliveryDTO,
  DeliveryStatus,
} from "@backend/src/types/delivery/common";
import { revalidateTag } from "next/cache";

const BACKEND_URL = "http://localhost:9000";

export async function proceedDelivery(delivery: DeliveryDTO) {
  if (delivery.delivery_status === DeliveryStatus.PENDING) {
    await acceptDelivery(delivery.id);
  }

  if (delivery.delivery_status === DeliveryStatus.PICKUP_CLAIMED) {
    return await prepareDelivery(delivery.id);
  }

  if (delivery.delivery_status === DeliveryStatus.RESTAURANT_PREPARING) {
    return await preparationReady(delivery.id);
  }

  console.log("Invalid delivery status", delivery.delivery_status);

  return null;
}

export async function acceptDelivery(
  deliveryId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/accept`,
      {
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    console.log("Delivery accepted", deliveryId);

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function declineDelivery(
  deliveryId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/decline`,
      {
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    console.log("Delivery declined", deliveryId);
    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function prepareDelivery(
  deliveryId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/prepare`,
      {
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("deliveries");

    console.log("Restarant is preparing order", deliveryId);

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function preparationReady(
  deliveryId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/ready`,
      {
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    console.log("Delivery is ready for pickup", deliveryId);

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setRestaurantStatus(
  restaurantId: string,
  status: boolean
) {
  try {
    const { restaurant } = await fetch(
      `${BACKEND_URL}/restaurants/${restaurantId}/status`,
      {
        method: "POST",
        body: JSON.stringify({ is_open: status }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["restaurants"],
        },
      }
    ).then((res) => res.json());

    console.log("Restaurant status updated", status);

    revalidateTag("restaurants");

    return restaurant;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createProduct(
  prevState: any,
  createProductData: FormData
) {
  const restaurantId = createProductData.get("restaurant_id");
  const productData = {} as Record<string, any>;

  Array.from(createProductData.entries()).forEach(([key, value]) => {
    if (key === "restaurant_id") {
      return;
    }
    productData[key] = value;
  });

  console.log("Creating product", productData);

  try {
    const { restaurant_product } = await fetch(
      `${BACKEND_URL}/restaurants/${restaurantId}/products`,
      {
        method: "POST",
        body: JSON.stringify(productData),
        next: {
          tags: ["products"],
        },
      }
    ).then((res) => res.json());

    console.log("Product created", restaurant_product);

    revalidateTag("products");

    return restaurant_product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
