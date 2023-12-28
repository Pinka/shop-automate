"use server";
import { redirect } from "next/navigation";
import {
  PrintifyImagesPage,
  PrintifyProduct,
  PrintifyProductPage,
} from "./PrintifyProductList";

export async function paginate(formData: FormData) {
  const action = formData.get("action");
  const page = formData.get("page");

  if (action === "next") {
    redirect(`/?page=${parseInt(page as string) + 1}`);
  } else if (action === "prev") {
    redirect(`/?page=${parseInt(page as string) - 1}`);
  }

  redirect(`/?page=${page}`);
}

export async function getProductsByPage(page: number) {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  const response = await fetch(
    `https://api.printify.com/v1/shops/${shopId}/products.json?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    console.error("Failed to get products", data);
    throw new Error("Failed to get products");
  }

  const data = (await response.json()) as PrintifyProductPage;

  return data;
}

export async function getImagesByPage(page: number) {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  const response = await fetch(
    `https://api.printify.com/v1/uploads.json?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    console.error("Failed to get images", data);
    throw new Error("Failed to get images");
  }

  const data = (await response.json()) as PrintifyImagesPage;

  return data;
}

export async function getProductById(productId: string) {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  const response = await fetch(
    `https://api.printify.com/v1/shops/${shopId}/products/${productId}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    console.error("Failed to get product", data);
    throw new Error("Failed to get product");
  }

  const data = (await response.json()) as PrintifyProduct;

  return data;
}

export async function getImageById(imageId: string) {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shopId = process.env.PRINTIFY_SHOP_ID;

  const response = await fetch(
    `https://api.printify.com/v1/uploads/${imageId}.json`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    console.error("Failed to get image", data);
    throw new Error("Failed to get image");
  }

  const data = (await response.json()) as PrintifyImage;

  return data;
}

export async function selectProduct(formData: FormData) {
  // Add product ID to the current URL

  const productId = formData.get("productId");
  redirect(`/cloneProduct/?productId=${productId}`);
}

interface PrintifyImage {
  id: string;
  file_name: string;
  height: number;
  width: number;
  size: number;
  mime_type: string;
  preview_url: string;
  upload_time: string;
}
