import { HiOutlineUserCircle } from "react-icons/hi";
import LogOutButton from "../module/LogOutButton";
import { ConnectDB } from "@/utils/connectDB";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/user.model";
import { UserType } from "@/types/dataType.type";
import SideBarItem from "@/module/SideBarItem";

const SideBarProfile = async ({ role }: { role?: string }) => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const findUser: Partial<UserType> | null = await User.findOne({
    email: session?.user?.email,
  });
  const { fullName, profile } = findUser ?? {};

  return (
    <div className="space-y-4 w-full col-span-2 pt-3">
      {/* Profile Card */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-900 p-5 shadow-md dark:shadow-blue-800 flex flex-col items-center gap-2">
        {profile ? (
          <img
            src={profile}
            alt="Profile"
            className="h-16 w-16 rounded-full border-2 border-white dark:border-blue-400 object-cover"
          />
        ) : (
          <HiOutlineUserCircle className="h-16 w-16 rounded-full border-2 border-white dark:border-blue-400 bg-gray-200 dark:bg-blue-800 text-gray-400 dark:text-blue-300 p-1.5" />
        )}

        <h2 className="text-lg font-bold text-black dark:text-white line-clamp-1 text-center">
          {fullName || "کاربر"}
        </h2>

        {role === "ADMIN" && (
          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-md">
            ADMIN
          </span>
        )}
      </div>

      {/* Menu Card */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-900 p-3 shadow-md dark:shadow-blue-800">
        <SideBarItem user={JSON.parse(JSON.stringify(findUser))} />
      </div>

      {/* Logout Card */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-900 p-3 shadow-md dark:shadow-blue-800">
        <LogOutButton  />
      </div>
    </div>
  );
};

export default SideBarProfile;
