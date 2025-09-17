"use client";

import { AdvertisementType } from "@/types/dataType.type";
import ReactMarkdown from "react-markdown";
import noImage from "public/images/noImage.png";
import toman from "public/svg/toman.svg";
import Image from "next/image";
import { categoryFaMap, sp } from "@/function/functions";
import { CategoryEnum } from "@/enum/enums.enum";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa6";
import CopyLinkButton from "@/module/CopyLinkButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MAP from "@/module/Map/MapMain";

const DetailAd = ({ ad }: { ad: AdvertisementType }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    title,
    price,
    address,
    city,
    province,
    description,
    constructionDate,
    typeOf,
    view,
    gallery,
    image,
    amenities,
    rules,
    rent,
    mobile,
    realState,
    location,
    category,
    createdAt,
  } = ad;

  const images = [image || noImage, ...(gallery || [])];

  const daysAgo = createdAt
    ? Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-gray-800 md:p-6 dark:text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md dark:from-blue-900 dark:to-blue-950">
        <button
          onClick={() => {
            router.back();
            router.refresh();
          }}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-200 dark:text-blue-300 dark:hover:bg-blue-800"
        >
          <FaArrowRight /> بازگشت
        </button>
        <h1 className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl dark:from-blue-400 dark:to-blue-300">
          {title}
        </h1>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end justify-between gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center dark:bg-blue-950">
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {typeOf ? "رهن" : "مبلغ"}
          </p>
          <p className="flex items-center gap-1 text-xl font-bold md:text-2xl">
            {sp(+price)}
            <Image src={toman} alt="toman" width={16} height={16} />
          </p>
        </div>
        {typeOf && (
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">اجاره</p>
            <p className="flex items-center gap-1 text-xl font-bold md:text-2xl">
              {sp(String(rent))}
              <Image src={toman} alt="toman" width={16} height={16} />
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-3 text-sm md:text-base">
        <span>
          {province}, {city}
        </span>
        <span>{address}</span>
        <span>نوع ملک: {typeOf ? "رهن و اجاره" : "خرید و فروش"}</span>
        <span>املاک: {realState}</span>
        <span>دسته بندی: {categoryFaMap[category as CategoryEnum]}</span>
        <span>{daysAgo} روز پیش</span>
        {constructionDate && <span>سال ساخت: {String(constructionDate)}</span>}
        {view && <span>بازدید: {view}</span>}
      </div>

      {/* Gallery */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          className="h-72 rounded-xl md:h-[450px]"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="relative">
              <Image
                src={src}
                alt={`image-${idx}`}
                width={800}
                height={500}
                className="h-full w-full rounded-xl object-cover"
              />
              {images.length > 1 && (
                <span className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-white">
                  {idx + 1}/{images.length}
                </span>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Description */}
      {description && (
        <div className="rounded-xl bg-white p-4 shadow-md dark:bg-blue-950">
          <h2 className="mb-2 border-b pb-1 text-xl font-semibold text-blue-700 dark:text-blue-400">
            توضیحات
          </h2>
          <ReactMarkdown >
            {description}
          </ReactMarkdown>
        </div>
      )}

      {/* Amenities */}
      {!!amenities?.length && (
        <div className="rounded-xl bg-blue-50 p-4 shadow-md dark:bg-blue-900">
          <h2 className="mb-2 border-b pb-1 text-xl font-semibold text-blue-700 dark:text-blue-400">
            امکانات
          </h2>
          <ul className="flex flex-wrap gap-2">
            {amenities.map((item, idx) => (
              <li
                key={idx}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 transition-transform hover:scale-105 dark:bg-blue-800 dark:text-blue-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rules */}
      {!!rules?.length  && (
        <div className="rounded-xl bg-white p-4 shadow-md dark:bg-blue-950">
          <h2 className="mb-2 border-b pb-1 text-xl font-semibold text-blue-700 dark:text-blue-400">
            قوانین
          </h2>
          <ul className="list-inside list-disc text-gray-700 dark:text-blue-200">
            {rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact & Copy Link */}
      <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md md:flex-row dark:from-blue-900 dark:to-blue-950">
        {session ? (
          <a
            href={`tel:${mobile}`}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-2 font-semibold text-white shadow transition hover:from-blue-700 hover:to-blue-900 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-400 dark:hover:to-blue-600"
          >
            تماس با صاحب آگهی
          </a>
        ) : (
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-2 font-semibold text-white shadow transition hover:from-blue-700 hover:to-blue-900 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-400 dark:hover:to-blue-600"
          >
            برای تماس ابتدا وارد شوید
          </Link>
        )}
        <CopyLinkButton />
      </div>

      {/* Map placeholder */}
      {location?.lat && location?.lng && (
        <div className="mt-6 h-80 w-full rounded-xl border shadow-md md:h-[400px]">
          <div className="mx-auto  h-full w-full rounded-xl border md:aspect-auto md:w-full">
            {location?.lat && location?.lng ? (
              <MAP
                data={{ lat: +location.lat, lng: +location.lng }}
                show={true}
              />
            ) : (
              <p className="text-gray-500">موقعیت ثبت نشده</p>
            )}
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default DetailAd;
