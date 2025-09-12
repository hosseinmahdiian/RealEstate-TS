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
      className="relative block h-fit overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <span className="absolute top-3 left-3 flex items-center gap-1 rounded-xl border border-blue-50 bg-blue-200 px-1.5 text-blue-400">
        <p className="mt-0.5 text-xs"> {view ?? 0}</p> <IoMdEye />
      </span>
      <div className="mx-auto mt-4 aspect-square w-9/12">
        <Image
          src={image || noImage}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full overflow-hidden rounded-lg object-cover shadow-lg"
        />
      </div>

      <div className="space- grid grid-cols-10 p-2">
        <h3 className="col-span-full line-clamp-1 text-lg font-bold text-gray-800">
          {title}
        </h3>
        <div className="col-span-full flex items-center justify-between gap-1">
          <span className="text-xs md:text-sm">{typeOf ? "رهن" : "مبلغ"}</span>
          <div className="flex items-center gap-2">
            <p className="pt-1.5 font-medium text-gray-500">{sp(+price)} </p>
            <Image
              src={toman}
              alt="toman"
              width={40}
              height={20}
              className="w-5 object-cover"
            />
          </div>
        </div>
        <div className="col-span-full flex h-5 items-center justify-between gap-1">
          {typeOf && <span className="text-xs md:text-sm">اجاره</span>}
          {typeOf && (
            <div className="flex items-center gap-2">
              <p className="pt-1.5 font-medium text-gray-500">
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
          )}
        </div>
        <div className="col-span-full flex items-center gap-1">
          <GrLocationPin className=" " />{" "}
          <p className="line-clamp-1 w-[calc(100%-20px)] text-gray-500">
            {address}
          </p>
        </div>
        <div className="col-span-4 flex items-center gap-1">
          <BiCategory />
          <p className="line-clamp-1 text-gray-500">
            {categoryFaMap[category as CategoryEnum]}
          </p>
        </div>
        {/* <p className="text-left"> {formattedDate}</p> */}
        <div className="col-span-6 flex items-center gap-1">
          <FaSearchLocation className="w-4" />
          <p className="line-clamp-1 text-sm text-gray-500">{realState}</p>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between px-3 text-blue-500">
        <FaArrowRight />
        <p className="">دیدن آگهی</p>
      </div>
    </Link>
  );
};

export default Card;
