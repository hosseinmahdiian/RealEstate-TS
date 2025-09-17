"use client";
import { UserType } from "@/types/dataType.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarItem = ({ user }: { user: Partial<UserType> }) => {
  const links = [
    { href: "/dashboard", label: "حساب کاربری" },
    { href: "/dashboard/myAd", label: "آگهی های من" },
    { href: "/dashboard/addAd", label: "ثبت آگهی" },
  ];
  const pathname = usePathname();

  return (
    <div className="mr-2 flex flex-wrap items-center justify-around gap-2 md:mr-0 md:flex-col">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-gray-400 dark:text-gray-100 ${pathname === href ? "!text-black dark:!text-gray-800" : ""}`}
        >
          {label}
        </Link>
      ))}
      {user.role == "ADMIN" && (
        <Link
          href="/admin"
          className={`text-gray-400 dark:text-gray-100 ${
            pathname === "/admin" ? "!text-black dark:!text-gray-800" : ""
          }`}
        >
          پنل ادمین
        </Link>
      )}

      {user.email == "hosseinmahdian81@gmail.com" && (
        <Link
          href="/admin/table"
          className={`text-gray-400 dark:text-gray-100 ${
            pathname === "/admin/table" ? "!text-black dark:!text-gray-800" : ""
          }`}
        >
          کاربران
        </Link>
      )}
    </div>
  );
};

export default SideBarItem;
