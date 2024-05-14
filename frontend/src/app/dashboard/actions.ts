"use server";

import { createAuthUser, createUser, getToken } from "@frontend/lib/users";
import { revalidateTag } from "next/cache";
import { createSession, decrypt, retrieveSession } from "../../lib/sessions";
import { redirect } from "next/navigation";

type FormState = {
  message?: string;
};

const redirecter = (payload: any) => {
  switch (payload?.scope) {
    case "customer":
      redirect("/");
    case "restaurant":
      redirect("/dashboard/restaurant");
    case "driver":
      redirect("/dashboard/driver");
  }
};

export async function signup(prevState: FormState, data: FormData) {
  const user_type = data.get("user_type") as string;
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

  const scope = user_type as "customer" | "restaurant" | "driver";

  try {
    const token = await createAuthUser({
      email,
      password,
      scope,
      provider: "emailpass",
    });

    createSession(token);
    revalidateTag("user");

    const { user, token: newToken } = await createUser({
      email,
      first_name,
      last_name,
      phone,
      scope,
    });

    createSession(newToken);
    revalidateTag("user");
    redirecter(user);

    return {
      message: "User created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Error creating user",
    };
  }
}

export async function login(prevState: FormState, data: FormData) {
  let token = retrieveSession();

  if (!token) {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      token = await getToken({
        email,
        password,
        scope: "restaurant",
        provider: "emailpass",
      });
      createSession(token);

      revalidateTag("user");
    } catch (error) {
      console.error(error);
      return {
        message: "Invalid email or password",
      };
    }
  }

  const payload = await decrypt(token!);

  redirecter(payload);

  return {
    message: "User logged in",
  };
}
