"use server";

import { getAndSetToken } from "@frontend/lib/data";
import { revalidateTag } from "next/cache";
import { retrieveSession } from "../../lib/sessions";

type FormState = {
  message?: string;
};

export async function login(prevState: FormState, data: FormData) {
  let token = await retrieveSession();

  if (!token) {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      token = await getAndSetToken({
        email,
        password,
        scope: "restaurant",
        provider: "emailpass",
      });
      revalidateTag("user");
      return {
        message: "User logged in successfully",
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Invalid email or password",
      };
    }
  }

  return {
    message: "User already logged in",
  };
}
