import {jwtVerify} from "jose";
import {revalidateTag} from "next/cache";
import {cookies as getCookies} from "next/headers";
import "server-only";

const jwtSecret = process.env.JWT_SECRET || "supersecret";

export async function createSession(token: string) {
  if (!token) return;

  const cookies = await getCookies();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies.set("_medusa_jwt", token, {
    httpOnly: true,
    secure: process.env.VERCEL_ENV === "production",
    expires: expiresAt,
    sameSite: "strict",
    path: "/"
  });
}

export async function retrieveSession() {
  const cookies = await getCookies();
  const token = cookies.get("_medusa_jwt")?.value;
  return token || null;
}

export async function destroySession() {
  const cookies = await getCookies();
  cookies.delete("_medusa_jwt");
  revalidateTag("user");
}

export async function decrypt(
  session: string | undefined = ""
): Promise<object | {message: string}> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(jwtSecret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      {name: "HMAC", hash: "SHA-256"},
      false,
      ["verify"]
    );

    const {payload} = await jwtVerify(session, cryptoKey, {
      algorithms: ["HS256"]
    });

    return payload;
  } catch (error) {
    console.error(error);
    return {message: "Error decrypting session"};
  }
}
