"use client";
import { DeleteImageAPI } from "@/services/DeleteImage.api";
import { UploadGalleryAPI } from "@/services/UploadGallery.api";
import { Dispatch, FC, SetStateAction } from "react";
import { TfiTrash } from "react-icons/tfi";

interface GalleryImage {
  id: string;
  url: string;
}

interface UploadGalleryProps {
  gallery: GalleryImage[];
  setGallery: Dispatch<SetStateAction<GalleryImage[]>>;
  disabled?: boolean;
}

const UploadGallery: FC<UploadGalleryProps> = ({
  gallery,
  setGallery,
  disabled = false,
}) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    const data = await UploadGalleryAPI(formData);

    if (data.images && Array.isArray(data.images)) {
      // هر آیتم شامل _id و path است
      const newImages = data.images.map((img: any) => ({
        id: img.id,
        url: img.url,
      }));
      console.log(newImages);

      setGallery((prev) => [...prev, ...newImages]);
    }
  };

  const handleDelete = async (id: string) => {
    if (disabled) return;

    const res = await DeleteImageAPI(id);
    if (res.success) {
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error(res.error);
    }
  };

  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between">
        <p className="mt-4 mb-5">گالری تصاویر</p>
        <label
          htmlFor="gallery"
          className={`${disabled && "!cursor-not-allowed !bg-blue-50 !text-gray-700"} mb-3 inline-block cursor-pointer rounded-lg bg-blue-200 px-4 py-2 text-sm text-gray-500 ${
            gallery?.length > 8 && "!bg-blue-100 !text-gray-700"
          }`}
        >
          افزودن تصاویر
        </label>
      </div>
      <input
        type="file"
        id="gallery"
        className="hidden"
        multiple
        accept="image/*"
        disabled={gallery?.length > 8 || disabled}
        onChange={handleUpload}
      />

      <div className="flex w-fit flex-wrap justify-center gap-2">
        {gallery.map((img) =>
          img.url ? (
            <div
              key={img.id}
              className="relative h-14 w-14 overflow-hidden rounded-lg"
            >
              <div
                className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 ${disabled && "!cursor-not-allowed"} `}
                onClick={() => handleDelete(img.id)}
              >
                <TfiTrash className="text-xl text-white" />
              </div>
              <img
                src={img.url}
                alt="gallery"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default UploadGallery;
