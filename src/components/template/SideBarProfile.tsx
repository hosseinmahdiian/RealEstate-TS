"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { HiOutlineUserCircle } from "react-icons/hi";
import LogOutButton from "../module/LogOutButton";
import { usePathname } from "next/navigation";
const links = [
  { href: "/dashboard", label: "حساب کاربری" },
  { href: "/dashboard/myAd", label: "آگهی های من" },
  { href: "/dashboard/addAd", label: "ثبت آگهی" },
];
const SideBarProfile = ({ role }: { role?: string }) => {
  const { data: session } = useSession();
  const { fullName, email, profile } = session?.user ?? {};
  const pathname = usePathname();

  return (
    <div className="h-fit w-full rounded-xl bg-blue-200 py-5 shadow shadow-blue-300">
      <div className="relative flex w-full items-center justify-between gap-3 md:block md:px-1">
        <div className="mr-1 w-fit md:!mx-auto md:mr-0">
          {profile ? (
            <img
              src={profile}
              alt=""
              className="h-16 w-16 rounded-full border-2 border-white bg-gray-400 object-cover"
            />
          ) : (
            <HiOutlineUserCircle className="mx-auto h-16 w-16 rounded-full border-2 border-white bg-gray-200 object-cover p-1.5 text-gray-400" />
          )}
          {role == "ADMIN" && (
            <div className="absolute top-10 text-xl text-blue-500"> A </div>
          )}
        </div>
        <div className="mx-auto w-[calc(100%-94px)] text-center md:w-full">
          <h2 className="mb-2 line-clamp-1 text-lg font-bold text-wrap text-black">
            {fullName}
          </h2>
        </div>
      </div>

      <hr className="mx-auto my-2 w-[calc(100%-20px)] border-gray-500" />
      <div className="mr-2 flex flex-wrap items-center justify-around gap-2 md:mr-0 md:flex-col">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-gray-500 ${
              pathname === href ? "!text-black" : ""
            }`}
          >
            {label}
          </Link>
        ))}
        {role == "ADMIN" && (
          <Link
            href="/admin"
            className={`text-gray-500 ${
              pathname === "/admin" ? "!text-black" : ""
            }`}
          >
            پنل ادمین
          </Link>
        )}
      </div>
      <hr className="mx-auto my-2 w-[calc(100%-20px)] border-gray-500" />
      <LogOutButton />
    </div>
  );
};

export default SideBarProfile;
