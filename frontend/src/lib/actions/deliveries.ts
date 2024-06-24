"use server";

import { revalidateTag } from "next/cache";
import {
  DeliveryDTO,
  DeliveryStatus,
} from "@backend/src/types/delivery/common";

const BACKEND_URL = "http://localhost:9000";

export async function proceedDelivery(
  delivery: DeliveryDTO,
  driverId?: string
) {
  if (delivery.delivery_status === DeliveryStatus.PENDING) {
    await acceptDelivery(delivery.id);
  }

  if (
    delivery.delivery_status === DeliveryStatus.RESTAURANT_ACCEPTED &&
    driverId
  ) {
    return await claimDelivery(delivery.id, driverId);
  }

  if (delivery.delivery_status === DeliveryStatus.PICKUP_CLAIMED) {
    return await prepareDelivery(delivery.id);
  }

  if (delivery.delivery_status === DeliveryStatus.RESTAURANT_PREPARING) {
    return await preparationReady(delivery.id);
  }
  if (delivery.delivery_status === DeliveryStatus.READY_FOR_PICKUP) {
    return await pickUpDelivery(delivery.id);
  }

  if (delivery.delivery_status === DeliveryStatus.IN_TRANSIT) {
    return await completeDelivery(delivery.id);
  }

  return { message: "Delivery is not in a state that can be proceeded" };
}

export async function claimDelivery(
  deliveryId: string,
  driverId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/claim`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driver_id: driverId }),
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    return { message: "Error claiming delivery" };
  }
}

export async function passDelivery(
  deliveryId: string,
  driverId: string
): Promise<{ message: string } | null> {
  try {
    await fetch(`${BACKEND_URL}/deliveries/${deliveryId}/pass`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver_id: driverId,
      }),
      method: "DELETE",
      next: {
        tags: ["deliveries"],
      },
    }).then((res) => res.json());

    revalidateTag("deliveries");

    return { message: "Delivery passed" };
  } catch (error) {
    return { message: "Error passing delivery" };
  }
}

export async function pickUpDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/pick-up`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    return { message: "Error picking up delivery" };
  }
}

export async function completeDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await fetch(
      `${BACKEND_URL}/deliveries/${deliveryId}/complete`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        next: {
          tags: ["deliveries"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    return { message: "Error completing delivery" };
  }
}

export async function acceptDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
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

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    return { message: "Error accepting delivery" };
  }
}

export async function declineDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
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

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    return { message: "Error declining delivery" };
  }
}

export async function prepareDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
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

    return delivery;
  } catch (error) {
    return { message: "Error preparing delivery" };
  }
}

export async function preparationReady(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
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

    revalidateTag("deliveries");

    return delivery;
  } catch (error) {
    return { message: "Error preparing delivery" };
  }
}
