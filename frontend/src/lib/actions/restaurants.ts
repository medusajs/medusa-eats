"use server";

import {
  RestaurantDTO,
  RestaurantProductDTO,
} from "@backend/src/types/restaurant/common";
import { retrieveSession } from "@frontend/lib/data/sessions";
import { promises as fs } from "fs";
import { revalidatePath, revalidateTag } from "next/cache";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";

export async function setRestaurantStatus(
  restaurantId: string,
  status: boolean
): Promise<RestaurantDTO | { message: string }> {
  try {
    const { restaurant } = await fetch(
      `${BACKEND_URL}/restaurants/${restaurantId}/status`,
      {
        method: "POST",
        body: JSON.stringify({ is_open: status }),
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["restaurants"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("restaurants");
    revalidatePath("/dashboard/driver");
    revalidatePath("/dashboard/restaurant");

    return restaurant;
  } catch (error) {
    return { message: "Error setting restaurant status" };
  }
}

export async function createProduct(
  prevState: any,
  createProductData: FormData
): Promise<RestaurantProductDTO | { message: string }> {
  const token = retrieveSession();
  const restaurantId = createProductData.get("restaurant_id") as string;
  const image = createProductData.get("image") as File;
  const fileName = image?.name;

  if (image) {
    await saveFile(image, fileName as string);
  }

  createProductData.set("thumbnail", `http://localhost:3000/${fileName}`);

  createProductData.delete("image");

  const productData = {} as Record<string, any>;

  Array.from(createProductData.entries()).forEach(([key, value]) => {
    if (key === "restaurant_id") {
      return;
    }
    productData[key] = value;
  });

  try {
    const { restaurant_product } = await fetch(
      `${BACKEND_URL}/restaurants/${restaurantId}/products`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
        credentials: "include",
        next: {
          tags: ["products"],
        },
      }
    ).then((res) => res.json());

    revalidateTag("products");

    return restaurant_product;
  } catch (error) {
    return { message: "Error creating product" };
  }
}

async function saveFile(file: File, fileName: string) {
  const data = await file.arrayBuffer();
  await fs.appendFile(`./public/${fileName}`, Buffer.from(data));
  return;
}

export async function deleteProduct(productId: string, restaurantId: string) {
  try {
    await fetch(`${BACKEND_URL}/restaurants/${restaurantId}/products`, {
      method: "DELETE",
      body: JSON.stringify({ product_id: productId }),
      next: {
        tags: ["products"],
      },
    });

    revalidateTag("products");
    revalidateTag("restaurants");

    return true;
  } catch (error) {
    return false;
  }
}
