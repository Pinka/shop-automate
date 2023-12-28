import Image from "next/image";
import { getImageById, getProductById } from "./actions";
import React from "react";
import { ImagePreviewButton } from "./ImagePreviewButton";

export const ProductDetails: React.FC<{
  productId: string;
}> = async ({ productId }) => {
  const product = await getProductById(productId);

  // get distinct print area picture IDs
  const printAreaImages = product.print_areas
    .flatMap((printArea) =>
      printArea.placeholders.flatMap((placeholder) =>
        placeholder.images.map((image) => ({
          id: image.id,
          position: placeholder.position,
        }))
      )
    )
    // group by image id
    .reduce((acc, curr) => {
      if (!acc[curr.id]) {
        acc[curr.id] = curr;
      }
      // else add position to existing image
      else {
        acc[curr.id].position += `, ${curr.position}`;
      }

      return acc;
    }, {} as Record<string, { id: string; position: string }>);
  // .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div className="flex flex-col gap-2 p-2 border rounded-md text-left">
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
          <p className="line-clamp-3">{product.description}</p>

          <ul className="flex flex-col gap-2">
            {Object.values(printAreaImages).map((image, index) => (
              <li key={index}>
                <p>
                  <strong>Placeholder area: </strong>
                  {image.position}
                </p>
                <PlaceholderImage imageId={image.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PlaceholderImage: React.FC<{
  imageId: string;
}> = async ({ imageId }) => {
  const image = await getImageById(imageId);

  return (
    <div className="flex flex-row gap-2">
      <ImagePreviewButton
        src={image.preview_url}
        width={image.width}
        height={image.height}
      >
        <Image
          src={image.preview_url}
          className="w-24 h-24 object-contain"
          alt="Product image"
          width={240}
          height={240}
        />
      </ImagePreviewButton>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">{image.file_name}</h2>
        <p>
          <strong>Size: </strong>
          {image.width} x {image.height}
        </p>
      </div>
    </div>
  );
};
