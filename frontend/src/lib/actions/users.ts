"use server";

import { CreateDriverDTO, CreateRestaurantAdminDTO } from "@frontend/lib/types";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "../../lib/data/sessions";
import { sdk } from "../config";
import { getAuthHeaders, getCacheHeaders, getCacheTag } from "../data/cookies";

type FormState =
  | {
      message?: string;
    }
  | undefined;

const redirecter = (actor_type: "restaurant" | "driver") => {
  let redirectPatch;
  if (actor_type === "restaurant") {
    redirectPatch = "/dashboard/restaurant";
  } else if (actor_type === "driver") {
    redirectPatch = "/dashboard/driver";
  } else {
    redirectPatch = "/";
  }
  redirect(redirectPatch);
};

export async function logout() {
  destroySession();
  redirect("/");
}

export async function signup(prevState: FormState, data: FormData) {
  const user_type = data.get("user_type") as string;
  const restaurant_id = data.get("restaurant_id") as string;
  const first_name = data.get("first_name") as string;
  const last_name = data.get("last_name") as string;
  const phone = data.get("phone") as string;
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const repeat_password = data.get("repeat_password") as string;

  if (password !== repeat_password) {
    return {
      message: "Passwords do not match",
    };
  }

  const actor_type = user_type as "restaurant" | "driver";

  try {
    const token = await createAuthUser({
      email,
      password,
      actor_type,
      provider: "emailpass",
    }).catch((error) => {
      throw new Error("Error creating auth user");
    });

    createSession(token);
    revalidateTag(getCacheTag("users"));

    const createUserData: CreateUserType = {
      email,
      first_name,
      last_name,
      phone,
      actor_type,
      token,
    };

    if (actor_type === "restaurant" && restaurant_id) {
      createUserData.restaurant_id = restaurant_id;
    }

    await createUser(createUserData).catch((error) => {
      throw new Error("Error creating user: " + error);
    });
    
  } catch (error) {
    return {
      message: "Error creating user: " + error,
    };
  }

  redirecter(actor_type);
}

export async function login(prevState: FormState, data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const actor_type = data.get("actor_type") as "restaurant" | "driver";

  let token;

  try {
    token = await getToken({
      email,
      password,
      actor_type,
      provider: "emailpass",
    });

    destroySession();
    createSession(token);

    revalidateTag(getCacheTag("users"));
  } catch (error) {
    return {
      message: "Invalid email or password",
    };
  }

  redirecter(actor_type);
}

export async function createAuthUser({
  email,
  password,
  actor_type,
  provider,
}: {
  email: string;
  password: string;
  actor_type: "restaurant" | "driver";
  provider: "emailpass";
}) {
  const { token }: { token: string } = await sdk.client.fetch(
    `/auth/${actor_type}/${provider}/register`,
    {
      method: "POST",
      body: { entity_id: email, password, email },
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("users"),
      },
    }
  );

  return token;
}

export type CreateUserType = (CreateDriverDTO | CreateRestaurantAdminDTO) & {
  actor_type: string;
  restaurant_id?: string;
  token: string;
};

export async function createUser(input: CreateUserType) {
  const { token, ...rest } = input;

  const res = await sdk.client.fetch("/store/users", {
    method: "POST",
    body: rest,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...getCacheHeaders("users"),
    },
  });

  return res;
}

export async function getToken({
  email,
  password,
  actor_type,
  provider,
}: {
  email: string;
  password: string;
  actor_type: "restaurant" | "driver";
  provider: "emailpass";
}) {
  const { token }: { token: string } = await sdk.client.fetch(
    `/auth/${actor_type}/${provider}`,
    {
      method: "POST",
      body: { email, password: password.toString() },
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...getCacheHeaders("users"),
      },
    }
  );

  return token;
}