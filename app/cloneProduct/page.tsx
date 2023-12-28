import { UploadedImagesPage } from "../components/UploadedImagesPage";
import { ProductDetails } from "../components/ProductDetails";
import { Products } from "../components/Products";
import { UploadedImagesExplorer } from "../components/UploadedImagesExplorer";

{
  /* List of steps:
        1. Choose a product to clone
        2. Select or upload images to use for cloned product
        3. Run the automation
      */
}

export default function CloneProductPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  const productId = searchParams.productId;

  return (
    <div className="flex flex-col max-w-lg m-auto items-center">
      <h1 className="font-semibold text-lg p-3">Clone Product</h1>
      <h2 className="p-2 font-semibold">Choose a product to clone</h2>

      <div className="flex flex-col max-w-lg m-auto items-center max-h-60 overflow-auto">
        <Products selectedProduct={productId} />
      </div>

      {productId && (
        <div className="flex flex-col max-w-lg m-auto items-center">
          <h2 className="p-2 font-semibold">Selected Product Details</h2>
          <ProductDetails productId={productId} />

          <h2 className="p-2 font-semibold">Select or upload images</h2>
          <UploadedImagesExplorer />

          <button className="border p-2">
            <h2 className="font-semibold">Run the automation</h2>
          </button>
        </div>
      )}
    </div>
  );
}
