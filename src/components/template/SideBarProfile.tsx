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
  const { fullName, email, profile } = findUser ?? {};
  console.log(profile);

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
      <SideBarItem user={JSON.parse(JSON.stringify(findUser))} />

      <hr className="mx-auto my-2 w-[calc(100%-20px)] border-gray-500" />
      <LogOutButton />
    </div>
  );
};

export default SideBarProfile;
