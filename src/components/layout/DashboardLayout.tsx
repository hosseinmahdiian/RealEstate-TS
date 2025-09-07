import { authOptions } from "@/api/auth/[...nextauth]/route";
import { ChildrenType } from "@/types/dataType.type";
import { getServerSession } from "next-auth";
import SideBarProfile from "../template/SideBarProfile";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: ChildrenType) => {
  const session = await getServerSession(authOptions);
  !session && redirect("/login");
  return (
    <div className="child:mt-3 grid grid-cols-1 md:grid-cols-4 md:gap-3">
      <SideBarProfile />
      <div className=" !mt-2
      col-span-3 overflow-y-scroll md:h-[calc(100vh-120px)]">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
