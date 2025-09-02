"use client";
import Button from "@/components/module/button";
import Input from "@/components/module/input";
import { onChengFormHandel } from "@/function/function";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LogInType } from "src/types/dataType.type";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { emailRegex } from "@/utils/Regex";

const LogInPage = () => {
  const router = useRouter();
  const [data, setData] = useState<LogInType>({
    email: "",
    password: "",
  });
  const [messages, setMessages] = useState<LogInType>({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);

  async function loginAction(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    let accept = true;
    if (!emailRegex.test(data.email)) {
      setMessages((prev) => ({
        ...prev,
        email: "ایمیل را درست وارد کنید ",
      }));
      accept = false;
    }

    if (!data.password) {
      setMessages((prev) => ({ ...prev, password: "رمز را وارد کنید" }));
      accept = false;
    }

    if (data.password.length < 8) {
      setMessages((prev) => ({
        ...prev,
        password: "رمز عبور باید حداقل ۸ رقم باشد",
      }));
      accept = false;
    }

    try {
      if (accept) {
        const res = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (res?.ok) {
          toast.success("ورود موفقیت‌آمیز بود");
          router.push("/");
        } else {
          toast.error(res?.error || "ایمیل یا رمز عبور اشتباهه");
        }
      }
    } catch (error: any) {
      toast.error("مشکلی پیش آمده است");
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="inset-x-0 -top-10 bottom-0 m-auto mt-4 h-fit max-w-xl rounded-2xl border-blue-500 md:absolute md:mt-40 md:border">
      <p className="mt-2 text-center text-xl font-bold text-blue-500">
        فرم ورود
      </p>
      <form className="child:mt-10 px-4" onSubmit={loginAction}>
        <Input
          title="ایمیل"
          data={data.email}
          alert={messages.email}
          FN={(e) => onChengFormHandel(setData, e)}
          name="email"
        />
        <Input
          title="رمز"
          data={data.password}
          alert={messages.password}
          FN={(e) => onChengFormHandel(setData, e)}
          name="password"
          type="password"
        />
        <Button
          type="submit"
          disabled={data.password.length < 8 || !data.email || isPending}
          title={isPending ? "در حال ورود..." : "ورود"}
          isLoading={isPending}
          style=""
        />
      </form>
      <p className="my-5 text-center">
        حساب کاربری ندارید؟
        <Link href="/signup" className="text-blue-500">
          ایجاد{" "}
        </Link>
      </p>
    </div>
  );
};

export default LogInPage;
