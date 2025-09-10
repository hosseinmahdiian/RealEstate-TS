"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaArrowRightToBracket, FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
  const session = useSession();
  // console.log(session);

  const { fullName, email } = session?.data?.user ?? {
    fullName: "",
    email: "",
  };

  return (
    <div className="sticky top-1 z-10 flex h-14 items-center justify-between rounded-xl bg-blue-500 px-5">
      <div className="pt flex items-center gap-2.5">
        <Link
          className="font-bold text-white transition-all ease-in-out hover:scale-x-105"
          href="/"
        >
          صفحه اصلی
        </Link>
        <Link
          className="font-bold text-white transition-all ease-in-out hover:scale-x-105"
          href="/advertisement "
        >
          آگهی ها
        </Link>
      </div>
      <>
        {session?.data ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-1 text-blue-500 transition-all ease-in-out hover:scale-x-105"
          >
            <p>{fullName}</p>
            <FaRegCircleUser />
          </Link>
        ) : (
          <Link
            href="/signup"
            className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-1 text-blue-500 transition-all ease-in-out hover:scale-x-105"
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
