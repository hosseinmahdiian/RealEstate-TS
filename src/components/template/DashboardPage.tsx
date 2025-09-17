"use client";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/module/input";
import { onChengFormHandel } from "@/function/functions";
import UploadImage from "@/module/UploadImage";
import Button from "@/module/button";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { EditUserAPI } from "@/services/EditUser.api";
import { UserType } from "@/types/dataType.type";
import { useRouter } from "next/navigation";
import Bg_Modal from "@/module/BgModal";
import { useSession } from "next-auth/react";
import { HiOutlineUserCircle } from "react-icons/hi";

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
  const { data: session, update } = useSession();
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

  const { mutate: mutateEditUser, isPending: isPendingEditUser } = useMutation({
    mutationKey: ["EditUser"],
    mutationFn: EditUserAPI,
    onSuccess: async (data) => {
      if (data?.success) {
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
        await update({
          user: {
            ...session?.user,
            fullName: data?.data?.fullName || "",
            email: data?.data?.email || "",
            mobile: data?.data?.mobile || "",
            profile: data?.data?.profile || "",
          },
        });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "خطایی رخ داده است");
    },
  });

  async function editUserFormActionFN(
    prevState: Partial<UserType> | null,
    formData: FormData,
  ) {
    let accept = true;
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
    accept && mutateEditUser(result);

    return result;
  }

  const [formData, formAction, isPending2] = useActionState(
    editUserFormActionFN,
    reset,
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 text-gray-800 dark:text-gray-200 relative">
      {/* Profile Info */}
      <div className="space-y-2 rounded-xl bg-blue-50 p-6 shadow-md dark:bg-blue-900">
        {profile ? (
          <img
            src={profile}
            alt="Profile"
            className="h-16 w-16 rounded-full border-2 border-white object-cover dark:border-blue-400"
          />
        ) : (
          <HiOutlineUserCircle className="h-16 w-16 rounded-full border-2 border-white bg-gray-200 p-1.5 text-gray-400 dark:border-blue-400 dark:bg-blue-800 dark:text-blue-300" />
        )}
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

      {/* Edit Button */}
      <div className="flex justify-center">
        <button
          className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-2 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-900 dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-400 dark:hover:to-blue-600"
          onClick={() => setIsOpen(true)}
        >
           ویرایش اطلاعات
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <>
          <Bg_Modal modal={isOpen} setModal={() => setIsOpen(false)} />
          <div className="absolute  inset-0 z-30 m-auto md:h-fit h-full w-full max-w-md rounded-xl overflow-hidden bg-blue-50 p-6 shadow-lg dark:bg-blue-900">
            <h2 className="mb-4 text-lg font-bold text-blue-800 dark:text-blue-300">
              ویرایش پروفایل
            </h2>
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

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="h-12 rounded-lg bg-gray-200 px-4 text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  انصراف
                </button>
                <Button
                  style="!mt-0"
                  title="ذخیره"
                  type="submit"
                  disabled={isPendingEditUser}
                  isLoading={isPendingEditUser}
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
