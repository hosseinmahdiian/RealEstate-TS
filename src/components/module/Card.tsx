"use client";

import { DateOption } from "@/constant/constant";
import { CategoryEnum } from "@/enum/enums.enum";
import { categoryFaMap, sp } from "@/function/functions";
import { CardProps, ResponseInterface } from "@/interface/interfaces.interface";
import Image from "next/image";
import Link from "next/link";
import toman from "public/images/toman.png";
import noImage from "public/images/noImage.png";
import { FaArrowRight } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { useMutation } from "@tanstack/react-query";
import { EditViewAdAPI } from "@/services/EditViewAd.api";
import { IoMdEye } from "react-icons/io";
const Card = ({ ad, count = false }: CardProps & { count?: boolean }) => {
  const {
    image,
    title,
    price,
    category,
    realState,
    constructionDate,
    address,
    view,
    _id,
    rent,
    typeOf,
  } = ad;

  const { mutate: mutateEditViewAd, isPending: isPendingEditViewAd } =
    useMutation({
      mutationKey: ["EditViewAd"],
      mutationFn: EditViewAdAPI,
      onSuccess: (data: ResponseInterface) => {
        if (data?.success) {
          console.log(data.message || "ویرایش شد");
        } else {
          console.log(data.error || "خطایی رخ داده است");
        }
      },
    });

  return (
    <Link
      href={`/advertisement/${_id}`}
      onClick={() => {
        count && mutateEditViewAd(String(_id));
      }}
      className="relative block h-fit overflow-hidden rounded-lg border border-blue-100 bg-white text-gray-800 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-blue-700 dark:bg-blue-950 dark:text-white"
    >
      {/* Views */}
      <span className="absolute top-3 left-3 flex items-center gap-1 rounded-xl border border-blue-100 bg-blue-50 px-1.5 text-xs text-blue-800 dark:border-blue-700 dark:bg-blue-800 dark:text-blue-200">
        <p className="mt-0.5">{view ?? 0}</p>
        <IoMdEye />
      </span>

      {/* Image */}
      <div className="mx-auto mt-4 aspect-square w-9/12">
        <Image
          src={image || noImage}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full overflow-hidden rounded-lg object-cover shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="grid grid-cols-10 p-2">
        <h3 className="col-span-full line-clamp-1 text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>

        <div className="h-15 w-full.  col-span-full ">
          {/* Price */}
          <div className="flex items-center justify-between gap-1 w-full ">
            <span className="text-xs md:text-sm">
              {typeOf ? "رهن" : "مبلغ"}
            </span>
            <div className="flex items-center gap-2">
              <p className="pt-1.5 font-medium text-gray-700 dark:text-gray-300">
                {sp(+price)}
              </p>
              <Image
                src={toman}
                alt="toman"
                width={40}
                height={20}
                className="w-5 object-cover"
              />
            </div>
          </div>

          {/* Rent */}
          {typeOf && (
            <div className="col-span-full flex items-center justify-between gap-1">
              <span className="text-xs md:text-sm">اجاره</span>
              <div className="flex items-center gap-2">
                <p className="pt-1.5 font-medium text-gray-700 dark:text-gray-300">
                  {sp(String(rent))}
                </p>
                <Image
                  src={toman}
                  alt="toman"
                  width={40}
                  height={20}
                  className="w-5 object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="col-span-full flex items-center gap-1 text-gray-500 dark:text-gray-300">
          <GrLocationPin />
          <p className="line-clamp-1 w-[calc(100%-20px)]">{address}</p>
        </div>

        {/* Category */}
        <div className="col-span-4 flex items-center gap-1 text-gray-500 dark:text-gray-300">
          <BiCategory />
          <p className="line-clamp-1">
            {categoryFaMap[category as CategoryEnum]}
          </p>
        </div>

        {/* Real State */}
        <div className="col-span-6 flex items-center gap-1 text-gray-500 dark:text-gray-300">
          <FaSearchLocation className="w-4" />
          <p className="line-clamp-1 text-sm">{realState}</p>
        </div>
      </div>

      {/* View Ad */}
      <div className="mb-2 flex items-center justify-between px-3 text-blue-500 dark:text-blue-400">
        <FaArrowRight />
        <p className="">دیدن آگهی</p>
      </div>
    </Link>
  );
};

export default Card;
