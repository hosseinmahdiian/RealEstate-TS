import { NextResponse } from "next/server";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { AdvertisementType } from "@/types/dataType.type";
import Advertisement from "@/models/Advertisement.model";
import User from "@/models/user.model";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body: AdvertisementType = await req.json();

  const {
    title,
    image,
    gallery,
    description,
    location,
    address,
    mobile,
    price,
    realState,
    constructionDate,
    category,
    amenities,
    rules,
    rent,
  } = body;

  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "اکانتی با این ایمیل یافت نشد" },
        { status: 404 },
      );
    }

    if (
      !title ||
      !description ||
      !address ||
      !mobile ||
      !price ||
      !constructionDate ||
      !realState ||
      !category
    ) {
      return NextResponse.json(
        { success: false, error: "دستا های ضروری را وارد کنید" },
        { status: 400 },
      );
    }
    const newAd = await Advertisement.create({
      ...body,
      userID: user?._id,
    });

    return NextResponse.json(
      { success: true, message: "آگهی افزوده شد", data: newAd },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "مشکلی در سرور پیش اومده" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  const body: AdvertisementType & { _id: string } = await req.json();

  const {
    _id,
    title,
    image,
    gallery,
    description,
    location,
    address,
    mobile,
    price,
    realState,
    constructionDate,
    category,
    amenities,
    rules,
    rent,
    city,
    province,
    typeOf,
    view,
  } = body;

  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session?.user?.email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "اکانتی با این ایمیل یافت نشد" },
        { status: 404 },
      );
    }

    if (
      !_id ||
      !title ||
      !description ||
      !address ||
      !mobile ||
      !price ||
      !constructionDate ||
      !realState ||
      !category ||
      !city ||
      !province ||
      (typeOf && !rent)
    ) {
      return NextResponse.json(
        { success: false, error: "داده‌های ضروری را وارد کنید" },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { success: false, error: "آیدی نامعتبر است" },
        { status: 400 },
      );
    }

    const updatedAd = await Advertisement.findOneAndUpdate(
      { _id, userID: user._id },
      {
        title,
        image,
        gallery,
        description,
        location,
        address,
        mobile,
        price,
        realState,
        constructionDate,
        category,
        amenities,
        rules,
        rent,
        city,
        province,
        typeOf,
        view,
      },
      { new: true, runValidators: true },
    );

    if (!updatedAd) {
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "آگهی ویرایش شد", data: updatedAd },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "مشکلی در سرور پیش اومده" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await ConnectDB();
    const ads = await Advertisement.find().select("-userID");
    return NextResponse.json({ success: true, data: ads }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "مشکلی در سرور پیش اومده" },
      { status: 500 },
    );
  }
}
