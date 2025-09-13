"use client";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/module/input";
import { onChengFormHandel } from "@/function/functions";
import UploadImage from "@/module/UploadImage";
import Button from "@/module/button";
import toast from "react-hot-toast";
import { emailRegex } from "@/utils/Regex";
import { useMutation } from "@tanstack/react-query";
import { EditAdAPI } from "@/services/EditAd.api";
import { EditUserAPI } from "@/services/EditUser.api";
import { UserType } from "@/types/dataType.type";
import { useRouter } from "next/navigation";
import Bg_Modal from "@/module/BgModal";

const reset: Partial<UserType> = {
  fullName: "",
  email: "",
  mobile: "",
  profile: "",
};
const DashboardPage = ({
  mobile,
  email,
  fullName,
  createdAt,
  role = "USER",
  profile,
  _id,
}: Partial<UserType>) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Partial<UserType>>({
    fullName: fullName || "",
    email: email || "",
    mobile: mobile || "",
    profile: profile || "",
  });
  console.log(profile?.slice(14));

  const [messages, setMessages] = useState<Partial<UserType>>(reset);
  const [image, setImage] = useState<{ url: string; id: string } | null>({
    url: String(profile),
    id: String(profile?.slice(14)),
  });
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      profile: image?.url || "",
    }));
  }, [image]);

  const {
    mutate: mutateEditUser,
    isPending: isPendingEditUser,
    data: dataEditUser,
  } = useMutation({
    mutationKey: ["EditUser"],
    mutationFn: EditUserAPI,
    onSuccess: (data) => {
      if (data?.success) {
        console.log(data?.data);
        setForm({
          fullName: data?.data?.fullName || "",
          email: data?.data?.email || "",
          mobile: data?.data?.mobile || "",
          profile: data?.data?.profile || "",
        });
        toast.success("اکانت کاربری آپدیت شد");
        router.refresh();
        setIsOpen(false);
        setImage({
          url: String(data?.data?.profile),
          id: String(data?.data?.profile?.slice(14)),
        });
      }
    },
    onError: (error) => {
      toast.error(error.message || "خطایی رخ داده است");
    },
  });

  async function editUserFormActionFN(
    prevState: Partial<UserType> | null,
    formData: FormData,
  ) {
    let accept = true;
    console.log("////");

    setMessages(reset);

    if (form?.mobile && form.mobile.length != 11) {
      setMessages((prev) => ({
        ...prev,
        mobile: "شماره تماس درست را وارد کنید",
      }));
      accept = false;
    }

    if (!form.fullName) {
      setMessages((prev) => ({
        ...prev,
        fullName: "نام و نام خانوادگی الزامی است",
      }));
      accept = false;
    }

    const result: Partial<UserType> = { ...form, _id };

    !accept && toast.error("موارد زیر را بررسی کنید");
    accept && console.log("اطلاعات فرم:", result);
    accept && mutateEditUser(result);

    return result;
  }

  const [formData, formAction, isPending2] = useActionState(
    editUserFormActionFN,
    reset,
  );

  return (
    <div className="w-full">
      <div className="space-y-4 text-gray-700">
        {/* {form.profile && (
          <div className="flex justify-center">
            <Image
              src={form.profile}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border"
            />
          </div>
        )} */}
        <p>
          <span className="font-semibold">نام کامل:</span>{" "}
          {fullName || "ثبت نشده"}
        </p>
        <p>
          <span className="font-semibold">ایمیل:</span> {email || "ثبت نشده"}
        </p>
        <p>
          <span className="font-semibold">موبایل:</span> {mobile || "ثبت نشده"}
        </p>
        <p>
          <span className="font-semibold">تاریخ عضویت:</span>{" "}
          {String(createdAt)}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          ✏️ ویرایش اطلاعات
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <>
          <Bg_Modal modal={isOpen} setModal={() => setIsOpen(false)} />
          <div className="absolute inset-0 z-30 m-auto h-fit w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">ویرایش پروفایل</h2>
            <form className="space-y-4" action={formAction}>
              <Input
                title="نام کامل"
                FN={(e) => onChengFormHandel(setForm, e)}
                data={form.fullName}
                alert={messages.fullName}
                name="fullName"
                style="lg:col-span-2"
                disabled={isPendingEditUser}
              />

              <Input
                title="موبایل"
                FN={(e) => onChengFormHandel(setForm, e, true, true)}
                data={form.mobile}
                alert={messages.mobile}
                name="mobile"
                style="lg:col-span-2"
                disabled={isPendingEditUser}
              />

              <UploadImage
                image={image}
                setImage={setImage}
                disabled={isPendingEditUser}
              />

              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-13 rounded-xl bg-gray-200 px-4 text-gray-700 hover:bg-gray-300"
                >
                  انصراف
                </button>
                <Button
                  style="!mt-0"
                  title="ذخیره"
                  type="submit"
                  disabled={false}
                  isLoading={false}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
