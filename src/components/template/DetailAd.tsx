"use client";

import { AdvertisementType } from "@/types/dataType.type";
import ReactMarkdown from "react-markdown";
import noImage from "public/images/noImage.png";
import toman from "public/images/toman.png";
import Image from "next/image";
import { categoryFaMap, sp } from "@/function/functions";
import MAP from "@/module/Map/MapMain";
import { CategoryEnum } from "@/enum/enums.enum";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const DetailAd = ({ ad }: { ad: AdvertisementType }) => {
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
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 shadow hover:bg-gray-200"
        >
          <FaArrowRight /> بازگشت
        </button>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      </div>

      {/* Price */}
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 md:text-sm">
            {typeOf ? "رهن" : "مبلغ"}
          </span>
          <p className="font-medium text-gray-800">{sp(+price)}</p>
          <Image src={toman} alt="toman" width={16} height={16} />
        </div>
        {typeOf && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 md:text-sm">اجاره</span>
            <p className="font-medium text-gray-800">{sp(String(rent))}</p>
            <Image src={toman} alt="toman" width={16} height={16} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
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

      {/* Gallery & Map */}
      <div className="grid h-full grid-cols-1 gap-1 md:grid-cols-2">
        {/* Gallery Slider */}
        <div className="overflow-hidden rounded-xl shadow">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            className="h-72 w-full md:h-[450px]"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={src}
                  alt={`image-${idx}`}
                  width={800}
                  height={500}
                  className="h-72 w-full rounded-xl object-cover md:h-[450px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Map */}
        <div className="mx-auto aspect-square w-[calc(100%-40px)] rounded-lg border md:aspect-auto md:w-full">
          {location?.lat && location?.lng ? (
            <MAP
              data={{ lat: +location.lat, lng: +location.lng }}
              show={true}
            />
          ) : (
            <p className="text-gray-500">موقعیت ثبت نشده</p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">توضیحات</h2>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}

      {/* Amenities */}
      {amenities && amenities.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">امکانات</h2>
          <ul className="flex flex-wrap gap-2">
            {amenities.map((item, idx) => (
              <li
                key={idx}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rules */}
      {rules && rules.length > 0 && (
        <div>
          <h2 className="mb-2 text-xl font-semibold">قوانین</h2>
          <ul className="list-inside list-disc text-gray-700">
            {rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact & Copy Link */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {mobile && (
          <a
            href={`tel:${mobile}`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-blue-700"
          >
            تماس با صاحب آگهی
          </a>
        )}

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("لینک آگهی کپی شد!");
          }}
          className="inline-block rounded-lg bg-gray-100 px-6 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-gray-200"
        >
          📋 کپی لینک آگهی
        </button>
      </div>
    </div>
  );
};

export default DetailAd;
