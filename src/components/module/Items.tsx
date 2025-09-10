"use client";
import { AdvertisementType } from "@/types/dataType.type";
import Link from "next/link";
import React from "react";
import Card from "./Card";
import { FaCircleArrowLeft } from "react-icons/fa6";

type ItemsProps = {
  title: string;
  url: string;
  query: AdvertisementType[];
};

const Items = ({ title, url, query = [] }: ItemsProps) => {
  return (
    <div className="mb-6">
      <div className="flex w-full justify-between text-blue-500">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link href={url} className="text-sm hover:underline">
          مشاهده همه
        </Link>
      </div>

      <div className="child:min-w-45 child:w-50 rel mx-auto mt-3 flex h-full w-[calc(100%-20px)] gap-3 overflow-x-scroll">
        {query.length > 0 ? (
          <>
            {query.slice(0, 9).map((ad, index) => (
              <Card ad={ad} key={index} />
            ))}
            <Link href={url} className="relative block">
              <div className="absolute inset-0 m-auto flex h-20 w-20 flex-col items-center justify-center rounded-full border border-blue-100 bg-white text-blue-500 shadow-sm hover:shadow-md">
                <FaCircleArrowLeft className="h-4 w-4" />
                <p className="text-xs">مشاهده همه</p>
              </div>
            </Link>
          </>
        ) : (
          <p className="text-sm text-gray-400">موردی یافت نشد</p>
        )}
      </div>
    </div>
  );
};

export default Items;
