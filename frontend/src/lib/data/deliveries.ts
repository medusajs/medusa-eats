import { DeliveryDTO } from "@backend/src/types/delivery/common";

const BACKEND_URL = "http://localhost:9000";

export async function retrieveDelivery(
  deliveryId: string
): Promise<DeliveryDTO> {
  const { delivery } = await fetch(`${BACKEND_URL}/deliveries/${deliveryId}`, {
    next: {
      tags: ["deliveries"],
    },
  }).then((res) => res.json());
  return delivery;
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
