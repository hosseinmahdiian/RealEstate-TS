"use client";
import Link from "next/link";
import React from "react";
import Card from "./Card";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { GetAdAPI } from "@/services/GetAd.api";
import { useQuery } from "@tanstack/react-query";
import { AdvertisementType } from "@/types/dataType.type";

const Items = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["GetAd"],
    queryFn: GetAdAPI,
  });

  if (isPending) return <p>در حال بارگذاری موارد...</p>;
  if (error) throw error;
  return (
    data?.data?.length > 0 && (
      <div className="mb-6 mt-10">
        <div className="flex w-full justify-between text-blue-500">
          <h2 className="text-lg font-semibold">پر بازدیدترین</h2>
          <Link
            href="/advertisement?mostViewed=true"
            className="text-sm hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="child:min-w-45 child:w-50 rel mx-auto mt-3 flex h-full w-[calc(100%-20px)] gap-3 overflow-x-scroll">
          {data?.data?.length > 0 ? (
            <>
              {data?.data
                ?.slice(0, 9)
                .map((ad: AdvertisementType, index: number) => (
                  <Card ad={ad} key={index} count={true} />
                ))}
              <Link
                href="/advertisement?mostViewed=true"
                className="relative block"
              >
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
    )
  );
};

export default Items;
