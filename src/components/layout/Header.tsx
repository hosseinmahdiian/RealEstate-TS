"use client";
import ThemeButton from "@/module/ThemeButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaArrowRightToBracket, FaRegCircleUser } from "react-icons/fa6";
import { CircleLoader } from "react-spinners";

const Header = () => {
  const session = useSession();
  // console.log(session);

  const { fullName, email } = session?.data?.user ?? {
    fullName: "",
    email: "",
  };

  return (
    <div className="custom-bg-header sticky top-1 z-10 flex h-14 items-center justify-between rounded-xl px-5">
      <div className="flex items-center gap-2.5">
        <ThemeButton />
        <Link
          className="font-bold text-gray-500 transition-all ease-in-out hover:scale-x-105 dark:text-white"
          href="/"
        >
          صفحه اصلی
        </Link>
        <Link
          className="font-bold text-gray-500 transition-all ease-in-out hover:scale-x-105 dark:text-white"
          href="/advertisement "
        >
          آگهی ها
        </Link>
      </div>
      <>
        {session?.status == "loading" && (
          <p className="flex h-10 items-center gap-2.5 rounded-xl bg-blue-50 px-4 py-1 text-blue-500 transition-all ease-in-out hover:scale-x-105">
            <CircleLoader color="#3b82f6" size={15} className="mt-" />
          </p>
        )}
        {session?.status == "authenticated" && (
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-xl bg-blue-50 px-4 py-1 text-blue-500 transition-all ease-in-out hover:scale-x-105"
          >
            <p className="line-clamp-1 max-w-20">{fullName}</p>
            <FaRegCircleUser />
          </Link>
        )}
        {session?.status == "unauthenticated" && (
          <Link
            href="/signup"
            className="flex items-center gap-2.5 rounded-xl bg-blue-50 px-4 py-1 text-blue-500 transition-all ease-in-out hover:scale-x-105"
          >
            <FaArrowRightToBracket />
            <p>ورود</p>
          </Link>
        )}
      </>
    </div>
  );
};

export default Header;
