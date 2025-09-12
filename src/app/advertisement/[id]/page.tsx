import Advertisement from "@/models/Advertisement.model";
import User from "@/models/user.model";
import DetailAd from "@/template/DetailAd";
import {
  AdvertisementType,
  ParamsAndSearchPramsType,
  UserType,
} from "@/types/dataType.type";
import { ConnectDB } from "@/utils/connectDB";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

const page = async ({ params }: ParamsAndSearchPramsType) => {
  await ConnectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return notFound();
  }

  const advertisement: AdvertisementType | null = (await Advertisement.findById(
    params.id,
  ).lean()) as unknown as AdvertisementType;

  if (!advertisement) {
    return notFound();
  }

  return <DetailAd ad={JSON.parse(JSON.stringify(advertisement))} />;
};

export default page;

export async function generateMetadata({ params }: ParamsAndSearchPramsType) {
  await ConnectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return { title: "آگهی یافت نشد" };
  }

  const advertisement: AdvertisementType | null = (await Advertisement.findById(
    params.id,
  ).lean()) as unknown as AdvertisementType;

  if (!advertisement) return { title: "آگهی یافت نشد" };

  const user: UserType | null = (await User.findById(
    advertisement.userID,
  ).lean()) as unknown as UserType;

  return {
    title: advertisement.title,
    description: advertisement.description,
    author: user.fullName,
  };
}
