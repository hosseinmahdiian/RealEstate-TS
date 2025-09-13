import { authOptions } from "@/api/auth/[...nextauth]/route";
import DashboardPage from "@/template/DashboardPage";
import { DateOption } from "@/constant/constant";
import User from "@/models/user.model";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { UserType } from "@/types/dataType.type";

export default async function Home() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const findUser: Partial<UserType> | null = JSON.parse(
    JSON.stringify(
      await User.findOne({
        email: session?.user?.email,
      }),
    ),
  );
  console.log(findUser);

  return (
    <div className="">
      <DashboardPage
        role={findUser?.role}
        fullName={findUser?.fullName}
        email={findUser?.email}
        mobile={findUser?.mobile}
        _id={findUser?._id}
        profile={findUser?.profile}
        createdAt={new Date(findUser?.createdAt ?? "").toLocaleDateString(
          "fa-IR",
          DateOption,
        )}
      />
    </div>
  );
}
