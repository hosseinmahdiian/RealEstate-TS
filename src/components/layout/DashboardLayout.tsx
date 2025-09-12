import { authOptions } from "@/api/auth/[...nextauth]/route";
import { ChildrenType, UserType } from "@/types/dataType.type";
import { getServerSession } from "next-auth";
import SideBarProfile from "../template/SideBarProfile";
import { notFound, redirect } from "next/navigation";
import { ConnectDB } from "@/utils/connectDB";
import User from "@/models/user.model";

const DashboardLayout = async ({ children }: ChildrenType) => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const findUser: UserType | null = await User.findOne({
    email: session?.user?.email,
  });
  if (!findUser) {
    redirect("/login");
  }
  return (
    <div className="child:mt-3 grid grid-cols-1 md:grid-cols-4 md:gap-3">
      <SideBarProfile role={findUser?.role} />
      <div className="col-span-3 !mt-2 overflow-y-scroll md:h-[calc(100vh-120px)]">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
