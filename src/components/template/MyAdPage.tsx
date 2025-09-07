import { authOptions } from "@/api/auth/[...nextauth]/route";
import User from "@/models/user.model";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import React from "react";
import DashboardCard from "../module/DashboardCard";
import { AdvertisementType } from "@/types/dataType.type";

const MyAdPage = async () => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const user = await User.aggregate([
    { $match: { email: session?.user?.email } },
    {
      $lookup: {
        from: "advertisements",
        foreignField: "userID",
        localField: "_id",
        as: "Advertisements",
      },
    },
  ]);

  const Advertisements: AdvertisementType[] = user[0]?.Advertisements;
  console.log(Advertisements);

  return (
    <div className="grid grid-cols-2 gap-3 p-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
      {Advertisements?.length > 0 ? (
        Advertisements?.map((ad,index) => (
          <DashboardCard ad={JSON.parse(JSON.stringify(ad))} key={index} />
        ))
      ) : (
        <p className="col-span-full mt-20 text-center text-xl text-gray-500">
          آگهی ثبت نشده{" "}
        </p>
      )}
    </div>
  );
};

export default MyAdPage;
