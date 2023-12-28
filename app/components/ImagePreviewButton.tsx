"use client";

import Image from "next/image";
import React from "react";

export const ImagePreviewButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  src: string;
  width: number;
  height: number;
}> = ({ className, children, src, width, height }) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setIsPreviewOpen(true)}
      >
        {children}
      </button>
      {isPreviewOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0 bg-gray-500 opacity-75"
                onClick={() => setIsPreviewOpen(false)}
              ></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white p-4">
                <div className="flex flex-col items-center">
                  <div className="text-center">
                    <div className="flex flex-col gap-2">
                      <Image
                        src={src}
                        className="object-contain"
                        alt="Product image"
                        width={width}
                        height={height}
                      />
                      <button
                        type="button"
                        onClick={() => setIsPreviewOpen(false)}
                        className="border p-2 hover:bg-gray-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
