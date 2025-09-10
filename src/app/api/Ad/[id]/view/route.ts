import Advertisement from "@/models/Advertisement.model";
import { ConnectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await ConnectDB();
    const { id } = params;

    await Advertisement.findByIdAndUpdate(id, { $inc: { view: 1 } });

    return NextResponse.json({ success: true, message: "بازدید اضافه شد" });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "خطا در افزایش بازدید" },
      { status: 500 },
    );
  }
}
