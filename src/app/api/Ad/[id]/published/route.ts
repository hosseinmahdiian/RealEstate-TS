import { authOptions } from "@/api/auth/[...nextauth]/route";
import Advertisement from "@/models/Advertisement.model";
import User from "@/models/user.model";
import { UserType } from "@/types/dataType.type";
import { ConnectDB } from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await ConnectDB();
    const { id } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "ابتدا لاگین کنید" },
        { status: 401 },
      );
    }

    const user: UserType | null = await User.findOne({
      email: session?.user?.email,
    });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "اکانتی با این ایمیل یافت نشد" },
        { status: 404 },
      );
    }

    if (user?.role != "ADMIN") {
      return NextResponse.json(
        { success: false, error: "شما اجازه انتشار این آگهی را ندارید" },
        { status: 404 },
      );
    }

    await Advertisement.findByIdAndUpdate(id, { published: true });
    return NextResponse.json({ success: true, message: "آگهی انتشار یافت" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "خطا در افزایش بازدید" },
      { status: 500 },
    );
  }
}
