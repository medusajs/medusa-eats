import { createSession } from "./sessions";
import { CreateDriverDTO } from "@backend/src/types/delivery/mutations";
import { CreateRestaurantAdminDTO } from "@backend/src/types/restaurant/mutations";

const BACKEND_URL = "http://localhost:9000";

export async function createRestaurantAdmin({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const { token } = await fetch(`${BACKEND_URL}/auth/restaurant/emailpass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
    next: {
      tags: ["user"],
    },
  }).then((res) => res.json());

  createSession(token);

  return token;
}

export async function createAuthUser({
  email,
  password,
  scope,
  provider,
}: {
  email: string;
  password: string;
  scope: "customer" | "restaurant" | "driver";
  provider: "emailpass";
}) {
  const { token } = await fetch(`${BACKEND_URL}/auth/${scope}/${provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ entity_id: email, password, email }),
    next: {
      tags: ["user"],
    },
  }).then((res) => res.json());

  return token;
}

export async function createUser(
  input: (CreateDriverDTO | CreateRestaurantAdminDTO) & { scope: string }
) {
  const { user, token } = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    next: {
      tags: ["user"],
    },
  }).then((res) => res.json());

  return { user, token };
}

export async function getToken({
  email,
  password,
  scope,
  provider,
}: {
  email: string;
  password: string;
  scope: "customer" | "restaurant" | "driver";
  provider: "emailpass";
}): Promise<string> {
  console.log({ email, password, scope, provider });

  const { token } = await fetch(`${BACKEND_URL}/auth/${scope}/${provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: password.toString() }),
    next: {
      tags: ["user"],
    },
  }).then((res) => res.json());

  if (!token) {
    throw new Error("Invalid email or password");
  }

  return token;
}
