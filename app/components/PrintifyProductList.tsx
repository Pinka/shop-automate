import { ProductList } from "./ProductList";
import { paginate } from "./actions";
import { getProductsByPage } from "./actions";

export const PrintifyProductList: React.FC<{
  page: number;
}> = async ({ page }) => {
  const products = await getProductsByPage(page);
  const isFirstPage = page === 1;
  const isLastPage = page === products.last_page;

  return (
    <div className="p-2">
      <ProductList products={products} />
      {/* pagination */}
      <form action={paginate}>
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
  id: string;
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
export interface PrintifyProductPlaceholderImage {
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

export interface PrintifyImagesPage {
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
  data: PrintifyImage[];
}
