"use server";

import {
  DeliveryDTO,
  DeliveryStatus,
} from "@backend/src/types/delivery/common";
import { revalidateTag } from "next/cache";

const BACKEND_URL = "http://localhost:9000";

export async function proceedDelivery(
  delivery: DeliveryDTO,
  driverId?: string
) {
  if (
    delivery.delivery_status === DeliveryStatus.RESTAURANT_ACCEPTED &&
    driverId
  ) {
    return await claimDelivery(delivery.id, driverId);
  }

  if (delivery.delivery_status === DeliveryStatus.READY_FOR_PICKUP) {
    return await pickUpDelivery(delivery.id);
  }

  if (delivery.delivery_status === DeliveryStatus.IN_TRANSIT) {
    return await completeDelivery(delivery.id);
  }

  console.log("Invalid delivery status", delivery.delivery_status);

  return null;
}

export async function claimDelivery(
  deliveryId: string,
  driverId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/claim`,
      {
        body: JSON.stringify({ driver_id: driverId }),
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    console.log("Delivery claimed by", delivery);

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function passDelivery(
  deliveryId: string,
  driverId: string
): Promise<string | null> {
  try {
    await fetch(`${BACKEND_URL}/deliveries/${deliveryId}/pass`, {
      body: JSON.stringify({
        driver_id: driverId,
      }),
      method: "DELETE",
      next: {
        tags: ["deliveries"],
      },
    }).then((res) => res.json());

    revalidateTag("deliveries");

    return "Delivery passed";
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pickUpDelivery(
  deliveryId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/pick-up`,
      {
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("deliveries");

    console.log("Order is picked up", deliveryId);

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function completeDelivery(
  deliveryId: string
): Promise<DeliveryDTO | null> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/complete`,
      {
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    console.log("Order delivered at ", delivery);

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    console.log(error);
    return null;
  }
}
