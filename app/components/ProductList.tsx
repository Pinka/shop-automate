import Image from "next/image";
import { PrintifyProductPage } from "./PrintifyProductList";
import clsx from "clsx";
import { ImagePreviewButton } from "./ImagePreviewButton";

export function ProductList({
  products,
  selectedProduct,
}: {
  products: PrintifyProductPage;
  selectedProduct?: string;
}) {
  if (!products) {
    return <div>Failed to load products</div>;
  }

  if (products.data.length === 0) {
    return <div>No products</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {products.data.map((product) => (
        <button
          type="submit"
          key={product.id}
          name="productId"
          value={product.id}
          className={clsx(
            "flex flex-col gap-2 p-2 border rounded-md text-left hover:bg-gray-200",
            {
              "bg-gray-100": selectedProduct === product.id,
            }
          )}
          aria-label="Select product"
        >
          <div className="flex flex-row gap-2">
            <ImagePreviewButton
              src={product.images[0].src}
              width={400}
              height={400}
              className="flex-shrink-0 self-start"
            >
              <Image
                src={product.images[0].src}
                className="object-contain"
                alt="Product image"
                width={96}
                height={96}
              />
            </ImagePreviewButton>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">{product.title}</h2>
              {product.external && (
                <p>
                  <span className="bg-green-400 p-1 px-2 border rounded-md">
                    Published
                  </span>
                </p>
              )}

              <p className="line-clamp-3">{product.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
