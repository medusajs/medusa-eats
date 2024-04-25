"use server";

import { getToken, retrieveUser } from "@frontend/lib/data";
import { cookies } from "next/headers";
import { revalidateCacheTag } from "./restaurant/page";
import { revalidateTag } from "next/cache";

type FormState = {
  message: string;
};

export async function getAndSetToken({
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
  try {
    const token = await getToken({ email, password, scope, provider });

    cookies().set("_medusa_jwt", token, {
      expires: 1,
      path: "/",
    });

    return token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function logIn(prevState: FormState, data: FormData) {
  let token = cookies().get("_medusa_jwt")?.value;

  if (!token) {
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      token = await getAndSetToken({
        email,
        password,
        scope: "customer",
        provider: "emailpass",
      });
    } catch (error) {
      console.error(error);
      return {
        message: "Invalid email or password",
      };
    }
  }

  try {
    const user = await retrieveUser();
    return user;
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to retrieve user",
    };
  }
}
