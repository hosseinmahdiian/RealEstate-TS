"use client";
import React, { useActionState, useEffect, useState } from "react";
import Button from "../module/button";
import Input from "../module/input";
import { onChengFormHandel } from "@/function/function";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProfileDataType } from "@/types/dataType.type";
import TextAria from "../module/Textaria";
import RadioCateGoresList from "./RadioCateGoresList";
import InputTextList from "../module/InputTextList";
import Calender from "../module/Calender";
import MAP from "../module/Map/MapMain";
import { LatLngData } from "src/interfaces/interface";
import { FetchAddressNeshan } from "@/services/Neshan.api";
import UploadGallery from "../module/UploadGallery";
import UploadImage from "../module/UploadImage";

interface GalleryImage {
  id: string;
  url: string;
}
const reset: ProfileDataType = {
  title: "",
  image: "",
  gallery: [],
  description: "",
  location: null,
  address: "",
  mobile: "",
  price: "",
  realState: "",
  constructionDate: "",
  category: "",
  amenities: [],
  rules: [],
};

const AddPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [location, setLocation] = useState<LatLngData | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [image, setImage] = useState<{ url: string; id: string } | null>({
    url: "",
    id: "",
  });

  const [data, setData] = useState<ProfileDataType>({
    title: "",
    image: "",
    gallery: [],
    description: "",
    location: null, // [lat, lng]
    address: "",
    mobile: "",
    price: "",
    realState: "",
    constructionDate: "",
    category: "",
    amenities: [],
    rules: [],
  });
  const [messages, setMessages] = useState<ProfileDataType>({
    title: "",
    image: "",
    gallery: [],
    description: "",
    location: null, // [lat, lng]
    address: "",
    mobile: "",
    price: "",
    realState: "",
    constructionDate: "",
    category: "",
    amenities: [],
    rules: [],
  });
  console.log(image, gallery);

  const {
    mutate: mutateFetchAddress,
    isPending: isPendingFetchAddress,
    data: dataFetchAddress,
  } = useMutation({
    mutationKey: ["FetchAddress"],
    mutationFn: FetchAddressNeshan,
    onSuccess: (data) => {
      if (data?.status == "OK") {
        setData((prev) => ({
          ...prev,
          address: data.formatted_address,
          location,
        }));
        toast.success("آدرس دقیق وارد شد ");
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

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["signup"],
  //   mutationFn: SignUp,
  //   onSuccess: (data) => {
  //     if (data?.success) {
  //       toast.success(data.message);
  //       setData({
  //         email: "",
  //         password: "",
  //         confirmPassword: "",
  //         fullName: "",
  //         mobile: "",
  //       });
  //       router.push("/login");
  //     } else {
  //       toast.error(data.error || "خطایی رخ داده است");
  //     }
  //   },
  //   onError: (error) => {
  //     toast.error(error.message || "خطایی رخ داده است");
  //   },
  // });

  async function sinUpAction(
    prevState: ProfileDataType | null,
    formData: FormData,
  ) {
    let accept = true;
    // const title = formData.get("title") as string;
    // const image = formData.get("image") as string;
    // const gallery = formData.getAll("gallery") as string[]; // چون ممکنه چندتا عکس باشه
    // const description = data?.description;
    // const location = [
    //   (formData.get("lat") as string) || "",
    //   (formData.get("lng") as string) || "",
    // ] as [string, string];
    // const address = formData.get("address") as string;
    // const mobile = formData.get("mobile") as string;
    // const price = formData.get("price") as string;
    // const realState = formData.get("realState") as string;
    // const constructionDate = formData.get("constructionDate") as string;
    // const category = formData.get("category") as string;
    // const amenities = formData.getAll("amenities") as string[];
    // const rules = formData.getAll("rules") as string[];

    setMessages(reset);

    if (!data.title) {
      setMessages((prev) => ({
        ...prev,
        title: "عنوان آگهی الزامی است",
      }));
      accept = false;
    }
    if (!data.mobile) {
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

    const result: ProfileDataType = data;

    !accept && toast.error("موارد زیر را بررسی کنید");
    accept && console.log("اطلاعات فرم:", result);
    // accept && mutate( result);

    return result;
  }

  const [formData, formAction, isPending2] = useActionState(sinUpAction, reset);

  return (
    <div className="overflow-y-scroll md:h-[calc(100vh-120px)]">
      <p className="mt-2 text-center text-xl font-bold text-blue-500">
        افزودن آگهی
      </p>
      <form
        className="child:mt-10 grid grid-cols-1 gap-2 px-4 md:grid-cols-2 lg:grid-cols-6"
        action={formAction}
      >
        <Input
          title="title"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.title}
          alert={messages.title}
          name="title"
          style="lg:col-span-2"
          // disabled={isPending}
        />

        <Input
          title="price"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.price}
          alert={messages.price}
          name="price"
          style="lg:col-span-2"
          // disabled={isPending}
        />

        <Input
          title="realState"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.realState}
          alert={messages.realState}
          name="realState"
          style="lg:col-span-2"
          // disabled={isPending}
        />

        <Input
          title="mobile"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.mobile}
          alert={messages.mobile}
          name="mobile"
          style="lg:col-span-2"
          // disabled={isPending}
        />

        <RadioCateGoresList
          set={setData}
          title="category"
          alert={messages.category}
          style="lg:col-span-2"

          // disabled={isPending}
        />
        <Input
          title="address"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.address}
          alert={messages.address}
          name="address"
          style="lg:col-span-2"

          // disabled={isPending}
        />

        <div className="aspect-square w-full lg:col-span-3">
          <MAP data={location} setData={setLocation} />
        </div>

        <div className="w-full lg:col-span-3">
          <Calender
            data={String(data.constructionDate)}
            name="constructionDate"
            setModal={setModal}
            modal={modal}
            set={setData}
            alert={String(messages.constructionDate)}
          />
          <UploadImage image={image} setImage={setImage} />
          <UploadGallery gallery={gallery} setGallery={setGallery} />
        </div>

        <TextAria
          title="description"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.description}
          alert={messages.description}
          name="description"
          style="lg:col-span-6 md:col-span-2"
          // disabled={isPending}
        />

        <InputTextList
          title="rules"
          data={data}
          type="rules"
          set={setData}
          style="lg:col-span-3"
        />
        <InputTextList
          title="amenities"
          data={data}
          type="amenities"
          set={setData}
          style="lg:col-span-3"
        />

        <Button
          type="submit"
          disabled={
            !data.title ||
            !data.mobile ||
            !data.price ||
            !data.address ||
            !data.realState ||
            !data?.mobile ||
            !data.description
          }
          title="ثبت آگهی"
          // isLoading={isPending}
          style="lg:col-span-6 md:col-span-2"
        />
      </form>
    </div>
  );
};

export default AddPage;
