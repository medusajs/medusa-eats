import { DriverDTO } from "@backend/src/types/delivery/common";

const BACKEND_URL = "http://localhost:9000";

export async function retrieveDriver(driverId: string): Promise<DriverDTO> {
  const { driver } = await fetch(`${BACKEND_URL}/drivers/${driverId}`, {
    next: {
      tags: ["drivers"],
    },
  }).then((res) => res.json());
  return driver;
}
