"use client";
import Card from "@/module/Card";
import { AdvertisementType } from "@/types/dataType.type";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  ads: AdvertisementType[];
};

const AdvertisementsPage = ({ ads }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filteredAds, setFilteredAds] = useState<AdvertisementType[]>(ads);

  const category = searchParams.get("category") || "all";
  const typeFilter = searchParams.get("type") || "all";
  const mostViewed = searchParams.get("mostViewed") === "true";

  useEffect(() => {
    let temp = [...ads];

    if (category !== "all")
      temp = temp.filter((ad) => ad.category === category);
    if (typeFilter === "rent") temp = temp.filter((ad) => ad.typeOf);
    else if (typeFilter === "sell") temp = temp.filter((ad) => !ad.typeOf);
    if (mostViewed) temp = temp.sort((a, b) => b.view - a.view);

    setFilteredAds(temp);
  }, [ads, category, typeFilter, mostViewed]);

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") params.delete(key);
    else params.set(key, value);
    router.replace(`/advertisement?${params.toString()}`);
  };

  return (
    <div className="mt-4 px-4">
      {/* فیلترها */}
      <div className="sticky top-18 z-10 mb-4 flex flex-wrap items-center gap-3 rounded-md bg-white p-3 shadow-md">
        <select
          className="rounded border px-2 py-1"
          value={category}
          onChange={(e) => updateSearchParam("category", e.target.value)}
        >
          <option value="all">همه دسته‌ها</option>
          <option value="apartment">آپارتمان</option>
          <option value="villa">ویلا</option>
          <option value="office">اداری</option>
        </select>

        <select
          className="rounded border px-2 py-1"
          value={typeFilter}
          onChange={(e) => updateSearchParam("type", e.target.value)}
        >
          <option value="all">همه نوع‌ها</option>
          <option value="rent">رهن و اجاره</option>
          <option value="sell">خرید و فروش</option>
        </select>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={mostViewed}
            onChange={(e) => {
              e.target.checked
                ? updateSearchParam("mostViewed", "true")
                : updateSearchParam("mostViewed", "");
            }}
          />
          پربازدیدترین
        </label>
      </div>

      {/* گرید آگهی‌ها */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredAds.length > 0 ? (
          filteredAds.map((ad, index) => (
            <Card ad={ad} key={index} count={true} />
          ))
        ) : (
          <p className="col-span-full mt-10 text-center text-gray-500">
            آگهی‌ای یافت نشد
          </p>
        )}
      </div>
    </div>
  );
};

export default AdvertisementsPage;
