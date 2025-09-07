import { NextResponse } from "next/server";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AdvertisementType } from "@/types/dataType.type";
import Advertisement from "@/models/Advertisement.model";
import User from "@/models/user.model";
import mongoose from "mongoose";

export async function DELETE(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { success: false, error: "آیدی نامعتبر است" },
        { status: 400 },
      );
    }

    const deletedAd = await Advertisement.findOneAndDelete({
      _id,
      userID: user._id,
    });

    if (!deletedAd) {
      return NextResponse.json(
        { success: false, error: "آگهی یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "آگهی حذف شد", data: deletedAd },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "مشکلی در سرور پیش اومده" },
      { status: 500 },
    );
  }
}
