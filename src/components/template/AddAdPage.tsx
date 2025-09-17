"use client";
import React, { useActionState, useEffect, useState } from "react";
import Button from "../module/button";
import Input from "../module/input";
import { onChengFormHandel } from "@/function/functions";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AdvertisementType } from "@/types/dataType.type";
import TextAria from "@/module/Textaria";
import RadioCateGoresList from "./RadioCateGoresList";
import InputTextList from "../module/InputTextList";
import Calender from "../module/Calender";
import MAP from "../module/Map/MapMain";
import { FetchAddressNeshan } from "@/services/Neshan.api";
import UploadGallery from "../module/UploadGallery";
import UploadImage from "../module/UploadImage";
import {
  LatLngData,
  ResponseInterface,
} from "@/interface/interfaces.interface";
import { CategoryEnum } from "@/enum/enums.enum";
import { AddAdAPI } from "@/services/AddAd.api";
import CheckBox from "../module/checkBox";
import SetProvinces from "../module/SetProvinces";
import SetCities from "../module/SetCity";

interface GalleryImage {
  id: string;
  url: string;
}
const reset: AdvertisementType = {
  title: "",
  image: "",
  gallery: [],
  description: "",
  location: null,
  address: "",
  mobile: "",
  price: "",
  rent: "",
  realState: "",
  constructionDate: "",
  category: CategoryEnum.Empty,
  amenities: [],
  rules: [],
  city: "",
  province: "",
  typeOf: false,
  view: 0,
};

const AddAdPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [rent, setRent] = useState<boolean>(false);
  const [province, setProvince] = useState<{
    id: number;
    name: string;
    slug: string;
    tel_prefix: string;
  }>({
    id: 0,
    name: "",
    slug: "",
    tel_prefix: "",
  });
  const [location, setLocation] = useState<LatLngData | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [image, setImage] = useState<{ url: string; id: string } | null>({
    url: "",
    id: "",
  });

  const [data, setData] = useState<AdvertisementType>(reset);
  const [messages, setMessages] = useState<AdvertisementType>(reset);

  const {
    mutate: mutateFetchAddress,
    isPending: isPendingFetchAddress,
    data: dataFetchAddress,
  } = useMutation({
    mutationKey: ["FetchAddress"],
    mutationFn: FetchAddressNeshan,
    onSuccess: (data) => {
      if (data?.status == "OK") {
        console.log(data);

        setData((prev) => ({
          ...prev,
          address: data.neighbourhood,
          location,
        }));
        toast.success("محدوده ملک وارد شد ");
      }
    },
    onError: (error) => {
      toast.error(error.message || "خطایی رخ داده است");
    },
  });

  useEffect(() => {
    if (location?.lat && location?.lng) {
      mutateFetchAddress({ lat: location.lat, lng: location.lng });
    } else {
      setData((prev) => ({
        ...prev,
        address: "",
        location: null,
      }));
    }
  }, [location]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      image: image?.url || "",
    }));
  }, [image]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      gallery: gallery?.length ? [...gallery.map((img) => img?.url)] : [],
    }));
  }, [gallery]);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      rent: "",
    }));
  }, [data.typeOf]);

  const { mutate: mutateAddAd, isPending: isPendingAddAd } = useMutation({
    mutationKey: ["AddAd"],
    mutationFn: AddAdAPI,
    onSuccess: (data: ResponseInterface) => {
      if (data?.success) {
        toast.success(String(data?.message));
        setData(reset);
        router.push("/");
      } else {
        toast.error(data.error || "خطایی رخ داده است");
      }
    },
    onError: (error) => {
      toast.error(error.message || "خطایی رخ داده است");
    },
  });

  async function sinUpAction(
    prevState: AdvertisementType | null,
    formData: FormData,
  ) {
    let accept = true;

    setMessages(reset);

    if (!data.title) {
      setMessages((prev) => ({
        ...prev,
        title: "عنوان آگهی الزامی است",
      }));
      accept = false;
    }
    if (!data.mobile || data.mobile.length != 11) {
      setMessages((prev) => ({
        ...prev,
        mobile: "شماره تماس را وارد کنید",
      }));
      accept = false;
    }
    if (!data.description) {
      setMessages((prev) => ({
        ...prev,
        description: "توضیحات آگهی الزامی است",
      }));

      accept = false;
    }
    if (!data.address) {
      setMessages((prev) => ({
        ...prev,
        address: "آدرس ملک الزامی است",
      }));
      accept = false;
    }
    if (!data.price) {
      setMessages((prev) => ({
        ...prev,
        price: "قیمت ملک الزامی است",
      }));
      accept = false;
    }
    if (!data.realState) {
      setMessages((prev) => ({
        ...prev,
        realState: "دپارتمان الزامی است",
      }));
      accept = false;
    }
    if (!data.constructionDate) {
      setMessages((prev) => ({
        ...prev,
        constructionDate: "سال ساخت ملک الزامی است",
      }));
      accept = false;
    }
    if (!data.category) {
      setMessages((prev) => ({
        ...prev,
        category: CategoryEnum.Error,
      }));
      accept = false;
    }
    if (!data.province) {
      setMessages((prev) => ({
        ...prev,
        province: "استان را وارد کنید",
      }));
      accept = false;
    }
    if (!data.city) {
      setMessages((prev) => ({
        ...prev,
        city: "شهر را وارد کنید",
      }));
      accept = false;
    }
    if (!data.rent && rent) {
      setMessages((prev) => ({
        ...prev,
        rent: "اجاره را وارد کنید",
      }));
      accept = false;
    }
    const result: AdvertisementType = data;

    !accept && toast.error("موارد زیر را بررسی کنید");
    accept && console.log("اطلاعات فرم:", result);
    accept && mutateAddAd(result);

    return result;
  }

  const [formData, formAction, isPending2] = useActionState(sinUpAction, reset);
  console.log(data);

  return (
    <>
      <p className="mt-2 text-center text-xl font-bold text-blue-500">
        افزودن آگهی
      </p>
      <div className="mt-5 flex items-center gap-2 px-4 text-gray-500">
        <p>خرید و فروش</p>
        <CheckBox
          data={rent}
          title=""
          FN={() => {
            setRent(!rent);
            setData((prev) => ({
              ...prev,
              typeOf: !rent,
            }));
          }}
          disabled={isPendingAddAd}
          name="rent"
        />
        <p>رهن و اجاره</p>
      </div>
      <form
        className="child:mt-10 grid grid-cols-1 gap-2 px-4 md:grid-cols-2 lg:grid-cols-6"
        action={formAction}
      >
        <Input
          title="عنوان آگهی"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.title}
          alert={messages.title}
          name="title"
          style="lg:col-span-2"
          disabled={isPendingAddAd}
        />
        <Input
          title="آژانس املاک"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.realState}
          alert={messages.realState}
          name="realState"
          style="lg:col-span-2"
          disabled={isPendingAddAd}
        />
        <Input
          title="شماره تماس"
          FN={(e) => onChengFormHandel(setData, e, true, true)}
          data={data.mobile}
          alert={messages.mobile}
          name="mobile"
          style="lg:col-span-2"
          disabled={isPendingAddAd}
        />
        <RadioCateGoresList
          set={setData}
          title="دسته بندی"
          alert={messages.category}
          data={data.category}
          style="lg:col-span-2"
          disabled={isPendingAddAd}
        />
        <Input
          title={rent ? "رهن" : "مبلغ"}
          FN={(e) => onChengFormHandel(setData, e, true)}
          data={data.price}
          alert={messages.price}
          name="price"
          style="lg:col-span-2"
          inputMode="numeric"
          disabled={isPendingAddAd}
        />{" "}
        {rent && (
          <Input
            title="اجاره"
            FN={(e) => onChengFormHandel(setData, e, true)}
            data={data?.rent}
            alert={messages?.rent}
            name="rent"
            inputMode="numeric"
            style="lg:col-span-2"
            disabled={isPendingAddAd}
          />
        )}
        <div className="flex items-center gap-2 lg:col-span-2">
          <SetProvinces
            setData={setData}
            setProvince={setProvince}
            province={data.province}
            alert={messages.province}
            disabled={isPendingAddAd}
          />
          <SetCities
            setData={setData}
            province={province}
            city={data.city}
            alert={messages.city}
            disabled={isPendingAddAd}
          />
        </div>
        <Input
          title="محدوده"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.address}
          alert={messages.address}
          name="address"
          style="lg:col-span-2"
          placeholder="از روی نقشه محدوده را انتخاب کنید"
          disabled={isPendingAddAd}
        />
        <div className="grid grid-cols-1 gap-2 md:col-span-2 md:grid-cols-2 lg:col-span-6">
          <div className="aspect-square w-full">
            <MAP
              data={location}
              setData={setLocation}
              disabled={isPendingAddAd}
            />
          </div>
          <div className="w-full">
            <Calender
              data={String(data.constructionDate)}
              name="constructionDate"
              setModal={setModal}
              modal={modal}
              set={setData}
              alert={String(messages.constructionDate)}
              disabled={isPendingAddAd}
            />
            <UploadImage
              image={image}
              setImage={setImage}
              disabled={isPendingAddAd}
            />
            <UploadGallery
              image={image?.url}
              gallery={gallery}
              setGallery={setGallery}
              disabled={isPendingAddAd}
            />
          </div>
        </div>
        <TextAria
          title="توضیحات"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.description}
          alert={messages.description}
          name="description"
          style="lg:col-span-6 md:col-span-2"
          disabled={isPendingAddAd}
        />
        <InputTextList
          title="قوانین ملک"
          data={data}
          type="rules"
          set={setData}
          style="lg:col-span-3"
          disabled={isPendingAddAd}
        />
        <InputTextList
          title="ویژگی های ملک"
          data={data}
          type="amenities"
          set={setData}
          style="lg:col-span-3"
          disabled={isPendingAddAd}
        />
        <Button
          type="submit"
          disabled={
            // !data.title ||
            // !data.mobile ||
            // !data.price ||
            // !data.address ||
            // !data.realState ||
            // !data?.mobile ||
            // !data.description ||
            // !data.category ||
            // (!data.rent && rent) ||
            // !data.city ||
            // !data.province ||
            isPendingAddAd
          }
          title="ثبت آگهی"
          isLoading={isPendingAddAd}
          style="lg:col-span-6 md:col-span-2"
        />
      </form>
    </>
  );
};

export default AddAdPage;
