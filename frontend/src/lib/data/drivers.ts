import {sdk} from "../config";
import {DriverDTO} from "@frontend/lib/types";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export async function retrieveDriver(driverId: string): Promise<DriverDTO> {
  const [authHeaders, cacheHeaders] = await Promise.all([
    getAuthHeaders(),
    getCacheHeaders("drivers")
  ]);

  const {
    driver
  }: {
    driver: DriverDTO;
  } = await sdk.client.fetch(`/store/drivers/${driverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...cacheHeaders
    }
  });

  return driver;
}
