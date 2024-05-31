"use server";

import { retrieveSession } from "@frontend/lib/data/sessions";
import { promises as fs } from "fs";
import { revalidatePath, revalidateTag } from "next/cache";

const BACKEND_URL = "http://localhost:9000";

export async function setRestaurantStatus(
  restaurantId: string,
  status: boolean
) {
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

    console.log("Restaurant status updated", status);

    revalidateTag("restaurants");
    revalidatePath("/dashboard/driver");
    revalidatePath("/dashboard/restaurant");

    return restaurant;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createProduct(
  prevState: any,
  createProductData: FormData
) {
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

  console.log("Creating product", productData);

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

    console.log("Product created", restaurant_product);

    revalidateTag("products");

    return restaurant_product;
  } catch (error) {
    console.log(error);
    return null;
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

    console.log("Product deleted", productId);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
