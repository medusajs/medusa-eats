import "server-only";
import { cookies } from "next/headers";

export async function createSession(token: string) {
  if (!token) {
    return;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("_medusa_jwt", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function retrieveSession() {
  const token = cookies().get("_medusa_jwt")?.value;

  if (!token) {
    return null;
  }

  return token;
}

export async function destroySession() {
  cookies().delete("_medusa_jwt");
}
