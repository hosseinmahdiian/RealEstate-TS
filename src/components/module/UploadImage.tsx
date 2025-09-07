"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TfiTrash } from "react-icons/tfi";
import { DeleteImageAPI } from "@/services/DeleteImage.api";
import { UploadImageAPI } from "@/services/UploadImage.api";

interface UploadImageProps {
  image: { url: string; id: string } | null;
  setImage: Dispatch<SetStateAction<{ url: string; id: string } | null>>;
  disabled?: boolean;
}

const UploadImage: FC<UploadImageProps> = ({
  image,
  setImage,
  disabled = false,
}) => {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const data = await UploadImageAPI(formData);

    if (data.success && data?.image?.url) {
      setImage({ url: data?.image?.url, id: data?.image?.id });
    }
  };

  const handleDelete = async () => {
    if (disabled) return;
    if (!image?.id) return;
    const res = await DeleteImageAPI(image.id);
    if (res.success) setImage(null);
    else console.error(res?.error);
  };

  return (
    <div className="flex w-full items-center justify-between px-5 py-2">
      <p>افزودن عکس اصلی</p>
      <div className="flex justify-end">
        <input
          disabled={disabled}
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
        <div
          className={`relative h-14 w-14 overflow-hidden rounded-lg bg-blue-200`}
        >
          {image?.url ? (
            <div
              className={`${disabled && "!cursor-not-allowed "} relative h-full w-full cursor-pointer`}
              onClick={handleDelete}
            >
              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                <TfiTrash className="text-xl text-white" />
              </span>
              <img
                src={image?.url}
                alt="main"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <label
              htmlFor="image"
              className={`${disabled && "!cursor-not-allowed !bg-blue-50 !text-gray-700"} flex h-full w-full cursor-pointer items-center justify-center text-center text-sm text-gray-500`}
            >
              انتخاب عکس
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
