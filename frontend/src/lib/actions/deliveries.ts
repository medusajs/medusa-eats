"use server";

import { DeliveryDTO, DeliveryStatus } from "@frontend/lib/types";
import { revalidateTag } from "next/cache";
import { getAuthHeaders, getCacheTag } from "../data/cookies";
import { sdk } from "../config";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9000";

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
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/claim`,
      {
        method: "POST",
        body: { driver_id: driverId },
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

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
    await sdk.client.fetch<{ message: string }>(
      `/store/deliveries/${deliveryId}/pass`,
      {
        method: "DELETE",
        headers: {
          ...getAuthHeaders(),
        },
        body: {
          driver_id: driverId,
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

    return { message: "Delivery passed" };
  } catch (error) {
    return { message: "Error passing delivery" };
  }
}

export async function pickUpDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/pick-up`,
      {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

    return delivery;
  } catch (error) {
    return { message: "Error picking up delivery" };
  }
}

export async function completeDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/complete`,
      {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

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
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/accept`,
      {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

    return delivery;
  } catch (error) {
    return { message: "Error accepting delivery" };
  }
}

export async function declineDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/decline`,
      {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

    return delivery;
  } catch (error) {
    return { message: "Error declining delivery" };
  }
}

export async function prepareDelivery(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/prepare`,
      {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

    return delivery;
  } catch (error) {
    return { message: "Error preparing delivery" };
  }
}

export async function preparationReady(
  deliveryId: string
): Promise<DeliveryDTO | { message: string }> {
  try {
    const { delivery } = await sdk.client.fetch<{ delivery: DeliveryDTO }>(
      `/store/deliveries/${deliveryId}/ready`,
      {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    revalidateTag(getCacheTag("deliveries"));

    return delivery;
  } catch (error) {
    return { message: "Error preparing delivery" };
  }
}
