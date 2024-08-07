import { DriverDTO } from "@frontend/lib/types";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:9000";

export async function retrieveDriver(driverId: string): Promise<DriverDTO> {
  const { driver } = await fetch(`${BACKEND_URL}/drivers/${driverId}`, {
    next: {
      tags: ["drivers"],
    },
  }).then((res) => res.json());
  return driver;
}
