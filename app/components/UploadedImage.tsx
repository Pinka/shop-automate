import Image from "next/image";
import { ImagePreviewButton } from "./ImagePreviewButton";
import { PrintifyImage } from "./PrintifyProductList";

export const UploadedImage: React.FC<{
  image: PrintifyImage;
}> = ({ image }) => {
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
