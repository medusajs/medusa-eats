import { sdk } from "../config";
import { DeliveryDTO } from "../types";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

export async function listDeliveries(
  filter?: Record<string, string>
): Promise<DeliveryDTO[]> {
  const { deliveries }: { deliveries: DeliveryDTO[] } = await sdk.client.fetch(
    "/store/deliveries",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("deliveries"),
      },
    }
  );

  return deliveries;
}

export async function retrieveDelivery(
  deliveryId: string
): Promise<DeliveryDTO> {
  const { delivery }: { delivery: DeliveryDTO } = await sdk.client.fetch(
    `/store/deliveries/${deliveryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("deliveries"),
      },
    }
  );
  return delivery;
}
