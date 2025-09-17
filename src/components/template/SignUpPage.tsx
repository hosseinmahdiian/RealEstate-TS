"use client";
import Button from "@/module/button";
import Input from "@/module/input";
import { onChengFormHandel } from "@/function/functions";
import { SignUp } from "@/services/SignUp.api";
import { SignUpType } from "@/types/dataType.type";
import { emailRegex } from "@/utils/Regex";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [data, setData] = useState<SignUpType>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    mobile: "",
  });
  const [messages, setMessages] = useState<SignUpType>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    mobile: "",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: SignUp,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || " ۱۱۱حساب کاربری با موفقیت ایجاد شد");
        setData({
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
          mobile: "",
        });
        router.push("/login");
      } else {
        toast.error(data.error || "خطایی رخ داده است");
      }
    },
    onError: (error) => {
      toast.error(error.message || "خطایی رخ داده است");
    },
  });

  async function sinUpAction(prevState: SignUpType | null, formData: FormData) {
    let accept = true;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const mobile = formData.get("mobile") as string;
    const email = formData.get("email") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    setMessages({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      mobile: "",
    });

    if (!fullName) {
      setMessages((prev) => ({
        ...prev,
        fullName: "نام و نام خانوادگی را وارد کنید",
      }));
      accept = false;
      // return { email, fullName, password: "", confirmPassword: "" };
    }

    if (!email) {
      setMessages((prev) => ({ ...prev, email: "ایمیل را وارد کنید" }));
      accept = false;
    }

    if (!password) {
      setMessages((prev) => ({ ...prev, password: "رمز را وارد کنید" }));
      accept = false;
    }

    if (password !== confirmPassword) {
      setMessages((prev) => ({
        ...prev,
        confirmPassword: "رمز های ورود یکسان نیست",
      }));
      accept = false;
    }

    if (password.length < 8) {
      setMessages((prev) => ({
        ...prev,
        password: "رمز عبور باید حداقل ۸ رقم باشد",
      }));
      accept = false;
    }

    if (!emailRegex.test(email)) {
      setMessages((prev) => ({
        ...prev,
        email: "ایمیل را درست وارد کنید ",
      }));
      accept = false;
    }

    !accept && toast.error("موارد ریر را بررسی کنید");
    accept && mutate({ email, password, fullName, mobile });
    return {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      mobile: "",
    };
  }

  const [formData, formAction, isPending2] = useActionState(sinUpAction, {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    mobile: "",
  });

  return (
    <div className="inset-x-0 top-20 bottom-0 m-auto mt-4 h-full rounded-2xl border border-blue-500 bg-blue-50 text-gray-800 md:absolute md:mt-16 md:h-fit md:w-[90%] dark:border-blue-700 dark:bg-blue-950  dark:text-white">
      <p className="mt-2 text-center text-xl font-bold text-blue-500 dark:text-blue-400">
        فرم ثبت نام
      </p>
      
      <form
        className="child:mt-10 grid grid-cols-1 gap-2 px-4 md:grid-cols-3"
        action={formAction}
      >
        <Input
          title="نام و نام خانوادگی"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.fullName}
          alert={messages.fullName}
          name="fullName"
        />
        <Input
          title="شماره تماس"
          FN={(e) => onChengFormHandel(setData, e, true, true)}
          data={data.mobile}
          alert={messages.mobile}
          name="mobile"
          placeholder="اختیاری"
          inputMode="numeric"
        />
        <Input
          title="ایمیل"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.email}
          alert={messages.email}
          name="email"
        />
        <Input
          title="رمز"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.password}
          alert={messages.password}
          name="password"
          type="password"
        />
        <Input
          title="تکرار رمز"
          FN={(e) => onChengFormHandel(setData, e)}
          data={data.confirmPassword}
          alert={messages.confirmPassword}
          name="confirmPassword"
          type="password"
        />
        <Button
          type="submit"
          disabled={
            !data.confirmPassword ||
            !data.password ||
            !data.email ||
            !data.fullName
          }
          title="ثبت نام"
          isLoading={isPending}
          style="dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white"
        />
      </form>
      <p className="my-5 text-center text-gray-700 dark:text-gray-300">
        حساب کاربری دارید؟
        <Link href="/login" className="text-blue-500 dark:text-blue-400">
          ورود
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
