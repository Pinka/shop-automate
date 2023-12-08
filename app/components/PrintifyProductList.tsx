import Image from "next/image";
import { redirect } from "next/navigation";

export const PrintifyProductList: React.FC<{
  page: number;
}> = async ({ page }) => {
  const products = await getProductsByPage(page);
  const isFirstPage = page === 1;
  const isLastPage = page === products.last_page;

  if (!products) {
    return <div>Failed to load products</div>;
  }

  if (products.data.length === 0) {
    return <div>No products</div>;
  }

  return (
    <div className="p-2">
      <h1 className="py-2">
        Printify Products <strong>{products.total}</strong>
      </h1>
      <form action={paginate}>
        <div className="grid grid-cols-1 gap-2">
          {products.data.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-2 p-2 border rounded-md"
            >
              <div className="flex flex-row gap-2">
                <input type="checkbox" aria-label="Select product" />

                <Image
                  src={product.images[0].src}
                  className="w-24 h-24 object-contain"
                  alt="Product image"
                  width={240}
                  height={240}
                />
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">{product.title}</h2>
                  {/* green indicator if product is published */}
                  {product.external && (
                    <p>
                      <span className="bg-green-400 p-1 px-2 border rounded-md">
                        Published
                      </span>
                    </p>
                  )}

                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* pagination */}
        <div className="flex flex-row gap-2 justify-center pt-2">
          <input type="hidden" name="page" value={page} />
          <button
            type="submit"
            name="action"
            value="prev"
            className="border p-2"
            disabled={isFirstPage}
          >
            Previous
          </button>
          <button
            type="submit"
            name="action"
            value="next"
            className="border p-2"
            disabled={isLastPage}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

async function paginate(formData: FormData) {
  "use server";
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

export interface PrintifyImage {
  id: string;
  file_name: string;
  height: number;
  width: number;
  size: number;
  mime_type: string;
  preview_url: string;
  upload_time: string;
}

export interface PrintifyProduct {
  id: number;
  title: string;
  description: string;
  blueprint_id: number;
  print_provider_id: number;
  variants: PrintifyProductVariant[];
  images: PrintifyProductImage[];
  print_areas: PrintifyProductPrintArea[];
  external?: PrintifyProductExternal;
  tags: string[];
  options: ProductOptions[];
  created_at: string;
  updated_at: string;
  visible: boolean;
  is_locked: boolean;
  is_printify_express_eligible: boolean;
  user_id: number;
  shop_id: number;
  sales_channel_properties: any;
}

export interface PrintifyNewProduct {
  title: string;
  description: string;
  blueprint_id: number;
  print_provider_id: number;
  variants: PrintifyProductVariant[];
  // images: PrintifyProductImage[];
  print_areas: PrintifyProductPrintArea[];
  external: PrintifyProductExternal;
}

export interface PrintifyProductImage {
  src: string;
  position: string;
  variant_ids: number[];
  is_default: boolean;
  is_selected_for_publishing: boolean;
}

interface PrintifyProductExternal {
  id: number;
  handle: string;
  shipping_template_id: number;
}

export interface PrintifyProductPage {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  data: PrintifyProduct[];
}

interface PrintifyProductVariant {
  id: number;
  price: number;
  is_enabled: boolean;
}

interface PrintifyProductPrintArea {
  variant_ids: number[];
  placeholders: PrintifyProductPlaceholder[];
}
interface PrintifyProductPlaceholder {
  position: string;
  images: PrintifyProductPlaceholderImage[];
}
interface PrintifyProductPlaceholderImage {
  id: string;
  x: number;
  y: number;
  scale: number;
  angle: number;
}

interface ProductOptions {
  name: string;
  type: string;
  values: ProductOptionValue[];
}

interface ProductOptionValue {
  id: number;
  title: string;
}
