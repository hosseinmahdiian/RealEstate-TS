"use client";
import React, { useActionState, useState } from "react";
import Button from "../module/button";
import Input from "../module/input";
import { onChengFormHandel, onChengRadioHandel } from "@/function/function";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProfileDataType } from "@/types/dataType.type";
import TextAria from "../module/Textaria";
import RadioCateGoresList from "./RadioCateGoresList";
import InputTextList from "../module/InputTextList";
import Calender from "../module/Calender";
import { FaStarOfLife } from "react-icons/fa6";
import MAP from "../module/Map/MapMain";

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

  console.log(data);

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

        <div className="aspect-square w-full lg:col-span-4">
          <MAP
            data={data.location}
            setData={(loc) => setData((prev) => ({ ...prev, location: loc }))}
          />
        </div>
        
        <Calender
          data={String(data.constructionDate)}
          name="constructionDate"
          setModal={setModal}
          modal={modal}
          set={setData}
          alert={String(messages.constructionDate)}
        />

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
