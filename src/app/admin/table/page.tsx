import { authOptions } from "@/api/auth/[...nextauth]/route";
import User from "@/models/user.model";
import BasicTable from "@/module/table";
import AdminPage from "@/template/admin/AdminPage";
import { UserType } from "@/types/dataType.type";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

const page = async () => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const findUser: UserType | null = await User.findOne({
    email: session?.user?.email,
  });

  if (findUser?.email != "hosseinmahdian81@gmail.com") {
    redirect("/");
  }
  const users = await User.find();

  return <BasicTable rows={JSON.parse(JSON.stringify(users))} />;
};

export default page;
