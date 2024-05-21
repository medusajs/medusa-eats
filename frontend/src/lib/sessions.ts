import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const jwtSecret = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(jwtSecret);

export function createSession(token: string) {
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

export function retrieveSession() {
  const token = cookies().get("_medusa_jwt")?.value;

  if (!token) {
    console.log("No token found");
    return null;
  }

  return token;
}

export function destroySession() {
  cookies().delete("_medusa_jwt");
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
