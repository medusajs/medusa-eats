import {sdk} from "../config";
import {DeliveryDTO} from "../types";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export async function listDeliveries(
  filter?: Record<string, string>
): Promise<DeliveryDTO[]> {
  const [authHeaders, cacheHeaders] = await Promise.all([
    getAuthHeaders(),
    getCacheHeaders("deliveries")
  ]);

  const {deliveries}: {deliveries: DeliveryDTO[]} = await sdk.client.fetch(
    "/store/deliveries",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...cacheHeaders
      }
    }
  );

  return deliveries;
}

export async function retrieveDelivery(
  deliveryId: string
): Promise<DeliveryDTO> {
  const [authHeaders, cacheHeaders] = await Promise.all([
    getAuthHeaders(),
    getCacheHeaders("deliveries")
  ]);

  const {delivery}: {delivery: DeliveryDTO} = await sdk.client.fetch(
    `/store/deliveries/${deliveryId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...cacheHeaders
      }
    }
  );

  return delivery;
}
