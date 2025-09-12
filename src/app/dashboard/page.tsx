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
  const findUser: UserType | null = await User.findOne({
    email: session?.user?.email,
  });

  return (
    <div className="">
      <DashboardPage
        role={findUser?.role}
        fullName={findUser?.fullName}
        email={findUser?.email}
        mobile={findUser?.mobile}
        createdAt={new Date(findUser?.createdAt ?? "").toLocaleDateString(
          "fa-IR",
          DateOption,
        )}
      />
    </div>
  );
}
