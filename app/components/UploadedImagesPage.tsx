import { getImagesByPage } from "./actions";
import { UploadedImage } from "./UploadedImage";

export const UploadedImagesPage: React.FC<{
  page: number;
}> = async ({ page }) => {
  const images = await getImagesByPage(page);

  if (!images) {
    return <div>Failed to load images</div>;
  }

  if (images.total === 0) {
    return <div>No images</div>;
  }

  return (
    <div className="p-2 w-full">
      <ul className="flex flex-col gap-2">
        {images.data.map((image) => (
          <li key={image.id}>
            <UploadedImage image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};
