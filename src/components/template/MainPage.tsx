import Advertisement from "@/models/Advertisement.model";
import Items from "@/module/Items";
import MapWrapper from "@/provider/WrapperMap";
import { ConnectDB } from "@/utils/connectDB";

export const revalidate = 10;

const MainPage = async () => {
  await ConnectDB();
  const allAd = await Advertisement.find({ published: true }).select("-userID");

  return (
    <div className="mt-8">
      <div className="items-center justify-between ">
        <h2 className="text-center text-3xl text-blue-500 mb-3">
          نمایش موقعیت ملک‌ها در نقشه
        </h2>
        {allAd && (
          <div className="aspect-square md:aspect-auto h-100 w-full ">
            <MapWrapper />
          </div>
        )}
      </div>

      <Items />
    </div>
  );
};

export default MainPage;
