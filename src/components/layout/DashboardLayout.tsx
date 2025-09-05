"use client";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { ChildrenType, SignUpType } from "@/types/dataType.type";
import { getServerSession } from "next-auth";
import { HiOutlineUserCircle } from "react-icons/hi";
import SideBarProfile from "../template/SideBarProfile";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardLayout = ({ children }: ChildrenType) => {
  const { data: session } = useSession();
  !session && redirect("/login");
  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-4 md:gap-3">
      <SideBarProfile />
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
