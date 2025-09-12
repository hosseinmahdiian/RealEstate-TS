import Advertisement from "@/models/Advertisement.model";
import AdvertisementsPage from "@/template/AdvertisementsPage";
import {
  AdvertisementType,
  ParamsAndSearchPramsType,
} from "@/types/dataType.type";
import { ConnectDB } from "@/utils/connectDB";
export const metadata = {
  title: " آگهی ها",
  // description: "خرید و اجاره ملاک را باما تجربه کنید",
};

const page = async ({
  params,
  searchParams = {},
}: ParamsAndSearchPramsType) => {
  console.log(searchParams);

  await ConnectDB();

  const advertisements: AdvertisementType[] = (await Advertisement.find({
    published: true,
  }).lean()) as unknown as AdvertisementType[];

  let data: AdvertisementType[] = advertisements;

  if (searchParams.category) {
    data = data.filter((i) => i.category === searchParams.category);
  }

  if (searchParams.type === "rent") {
    data = data.filter((i) => i.typeOf);
  } else if (searchParams.type === "sell") {
    data = data.filter((i) => !i.typeOf);
  }

  if (searchParams.mostViewed) {
    data = data.sort((a, b) => b.view - a.view);
  }

  return <AdvertisementsPage ads={JSON.parse(JSON.stringify(data))} />;
};

export default page;
