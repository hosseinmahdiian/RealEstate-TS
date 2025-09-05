import { authOptions } from "@/api/auth/[...nextauth]/route";
import DashboardPage from "@/components/template/DashboardPage";
import { DateOption } from "@/constant/constant";
import User from "@/models/user.model";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";

export default async function Home() {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const findUser = await User.findOne({ email: session?.user?.email });

  return (
    <div className="">
      <DashboardPage
        fullName={findUser.fullName}
        email={findUser.email}
        mobile={findUser.mobile}
        createdAt={new Date(findUser.createdAt).toLocaleDateString(
          "fa-IR",
          DateOption,
        )}
      />
    </div>
  );
}
