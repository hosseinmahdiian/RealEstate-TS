"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TfiTrash } from "react-icons/tfi";
import { DeleteImageAPI } from "@/services/DeleteImage.api";
import {
  UploadImageAPI,
  UploadImageResponse,
} from "@/services/UploadImage.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ResponseInterface } from "@/interface/interfaces.interface";

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
  const { mutate: mutateUploadImage, isPending: isPendingUploadImage } =
    useMutation({
      mutationKey: ["UploadImage"],
      mutationFn: UploadImageAPI,
      onSuccess: (data: UploadImageResponse) => {
        if (data?.success) {
          if (data.success && data?.image?.url) {
            setImage({ url: data?.image?.url, id: data?.image?.id });
          }
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
      mutationFn: DeleteImageAPI,
      onSuccess: (data: ResponseInterface) => {
        if (data?.success) {
          setImage(null);
        } else {
          toast.error(data.error || "خطایی رخ داده است");
        }
      },
      onError: (error) => {
        toast.error(error.message || "خطایی رخ داده است");
      },
    });

  let disUp = isPendingUploadImage || disabled;
  let disDel = isPendingDeleteImage || disabled;
  return (
    <div className="flex w-full items-center justify-between px-5 py-2">
      <p>افزودن عکس اصلی</p>
      <div className="flex justify-end">
        <input
          disabled={disUp}
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (disUp) return;
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            mutateUploadImage(formData);
          }}
        />
        <div
          className={`relative h-14 w-14 overflow-hidden rounded-lg bg-blue-200`}
        >
          {image?.url ? (
            <div
              className={`${disDel && "!cursor-not-allowed"} relative h-full w-full cursor-pointer`}
              onClick={() => {
                if (disDel) return;
                if (!image?.id) return;
                mutateDeleteImage(image.id);
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                {!disDel ? (
                  <TfiTrash className="text-xl text-white" />
                ) : (
                  <p>...</p>
                )}
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
              className={`${disUp && "!cursor-not-allowed !bg-blue-50 !text-gray-700"} flex h-full w-full cursor-pointer items-center justify-center text-center text-sm text-gray-500`}
            >
              {!disUp ? <p> انتخاب عکس</p> : <p> ... </p>}{" "}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
