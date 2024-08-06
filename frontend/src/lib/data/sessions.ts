import { jwtVerify } from "jose";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import "server-only";

const jwtSecret = process.env.JWT_SECRET || "supersecret";

export function createSession(token: string) {
  if (!token) {
    return;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("_medusa_jwt", token, {
    httpOnly: true,
    secure: process.env.VERCEL_ENV === "production",
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
}

export function retrieveSession() {
  const token = cookies().get("_medusa_jwt")?.value;

  if (!token) {
    return null;
  }

  return token;
}

export function destroySession() {
  cookies().delete("_medusa_jwt");
  revalidateTag("user");
}

export async function decrypt(
  session: string | undefined = ""
): Promise<object | { message: string }> {
  try {
    // Convert the secret to a CryptoKey
    const encoder = new TextEncoder();
    const keyData = encoder.encode(jwtSecret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const { payload } = await jwtVerify(session, cryptoKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error(error);
    return { message: "Error decrypting session" };
  }
}
