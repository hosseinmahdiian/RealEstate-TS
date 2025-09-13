"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarItem = ({ role }: { role: string }) => {
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
          className={`text-gray-500 ${pathname === href ? "!text-black" : ""}`}
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
  );
};

export default SideBarItem;
