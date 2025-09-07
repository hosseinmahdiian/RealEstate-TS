import { authOptions } from "@/api/auth/[...nextauth]/route";
import Advertisement from "@/models/Advertisement.model";
import EditAdPage from "@/template/EditAdPage";
import { ConnectDB } from "@/utils/connectDB";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;

  await ConnectDB();

  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <p className="col-span-full mt-20 text-center text-xl text-gray-500">
        آگهی پیدا نشد
      </p>
    );
  }

  const ad = await Advertisement.findById(id);

  if (
    !ad ||
    !ad.userID.equals(session.user.id) ||
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    return (
      <p className="col-span-full mt-20 text-center text-xl text-gray-500">
        آگهی پیدا نشد
      </p>
    );
  }

  return <EditAdPage ad={JSON.parse(JSON.stringify(ad))} />;
}
