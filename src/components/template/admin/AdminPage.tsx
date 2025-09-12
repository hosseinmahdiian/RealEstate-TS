import { ConnectDB } from "@/utils/connectDB";
import AdminCard from "./AdminCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import Advertisement from "@/models/Advertisement.model";

const AdminPage = async () => {
  await ConnectDB();
  const session = await getServerSession(authOptions);
  const Advertisements = await Advertisement.find({ published: false }).select(
    "-userID",
  );

  return (
    <div className="grid grid-cols-2 gap-3 p-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4">
      {Advertisements?.length > 0 ? (
        Advertisements?.map((ad, index) => (
          <AdminCard ad={JSON.parse(JSON.stringify(ad))} key={index} />
        ))
      ) : (
        <p className="col-span-full mt-20 text-center text-xl text-gray-500">
          آگهی موجود نیست{" "}
        </p>
      )}
    </div>
  );
};

export default AdminPage;
