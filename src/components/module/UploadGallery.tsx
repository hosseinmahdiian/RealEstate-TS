"use client";
import { ResponseInterface } from "@/interface/interfaces.interface";
import { DeleteImageAPI } from "@/services/DeleteImage.api";
import {
  UploadGalleryAPI,
  UploadGalleryResponse,
} from "@/services/UploadGallery.api";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaStarOfLife } from "react-icons/fa6";
import { TfiTrash } from "react-icons/tfi";

interface GalleryImage {
  id: string;
  url: string;
}

interface UploadGalleryProps {
  image?: string;
  gallery: GalleryImage[];
  setGallery: Dispatch<SetStateAction<GalleryImage[]>>;
  disabled?: boolean;
}

const UploadGallery: FC<UploadGalleryProps> = ({
  image = "",
  gallery,
  setGallery,
  disabled = false,
}) => {
  const [id, setID] = useState<string>("");
  const { mutate: mutateUploadGallery, isPending: isPendingUploadGallery } =
    useMutation({
      mutationKey: ["UploadGallery"],
      mutationFn: UploadGalleryAPI,
      onSuccess: (data: UploadGalleryResponse) => {
        if (data?.success && data.images && Array.isArray(data.images)) {
          const newImages = data.images.map((img: any) => ({
            id: img.id,
            url: img.url,
          }));
          setGallery((prev) => [...prev, ...newImages]);
        } else {
          toast.error(data.error || "خطایی رخ داده است");
        }
      },
      onError: (error) => {
        toast.error(error.message || "خطایی رخ داده است");
      },
    });

  const { mutate: mutateDeleteImage, isPending: isPendingDeleteImage } =
    useMutation({
      mutationKey: ["DeleteImage"],
      mutationFn: (id: string) => DeleteImageAPI(id),
      onSuccess: (data, id) => {
        if (data?.success) {
          setGallery((prev) => prev.filter((item) => item.id !== id));
        } else {
          toast.error(data?.error || "خطایی رخ داده است");
        }
      },
      onError: (error: any) => {
        toast.error(error?.message || "خطایی رخ داده است");
      },
    });
  // let id: string = "68c2c0e99a235a77dca74b65";
  let disUp: boolean = isPendingUploadGallery || disabled;
  let disDel: boolean = isPendingDeleteImage || disabled;
  return (
    <div className="relative w-full px-5">
      <div className="flex items-center justify-between">
        <p className="mt-4 mb-5">گالری تصاویر</p>
        <label
          htmlFor="gallery"
          className={`${disUp && "!cursor-not-allowed !bg-blue-50 !text-gray-700"} mb-3 inline-block cursor-pointer rounded-lg bg-blue-200 px-4 py-2 text-sm text-gray-500 ${
            gallery?.length > 8 && "!bg-blue-100 !text-gray-700"
          }`}
        >
          {!disUp ? <p> افزودن تصاویر</p> : <p>...</p>}
        </label>
      </div>
      <input
        type="file"
        id="gallery"
        className="hidden"
        multiple
        accept="image/*"
        disabled={gallery?.length > 8 || disUp || !image}
        onChange={(e) => {
          if (disabled) return;
          const files = e.target.files;
          if (!files) return;

          const formData = new FormData();
          Array.from(files).forEach((file) => formData.append("files", file));

          mutateUploadGallery(formData);
        }}
      />
      {!image && (
        <label
          className={`absolute start-1 -bottom-6 flex !h-fit items-center gap-2 text-sm text-yellow-400 transition-all ease-linear`}
        >
          <p className="mt-0.5">ابتدا عکس اصلی را انتخاب کنید</p>
        </label>
      )}
      <div className="flex w-fit flex-wrap justify-center gap-2">
        {gallery.map((img) =>
          img.url ? (
            <div
              key={img.id}
              className="relative h-14 w-14 overflow-hidden rounded-lg"
            >
              <div
                className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 ${!disDel && id == img.id && "!cursor-not-allowed"} `}
                onClick={() => {
                  if (disDel && id == img.id) return;
                  mutateDeleteImage(img.id);
                  setID(img.id);
                }}
              >
                {!(disDel && id == img.id) ? (
                  <TfiTrash className="text-xl text-white" />
                ) : (
                  <p>...</p>
                )}
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
