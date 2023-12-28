"use client";

import { useState, useEffect } from "react";
import { PrintifyImagesPage } from "./PrintifyProductList";
import { UploadedImage } from "./UploadedImage";
import { getImagesByPage, paginate } from "./actions";

export const UploadedImagesExplorer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<PrintifyImagesPage>();

  useEffect(() => {
    getImagesByPage(page).then((images) => setImages(images));
  }, [page]);

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
      <div className="flex flex-row gap-2 justify-center pt-2">
        <input type="hidden" name="page" value={page} />
        <button
          type="submit"
          name="action"
          value="prev"
          className="border p-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          type="submit"
          name="action"
          value="next"
          className="border p-2"
          disabled={page === images.last_page}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
