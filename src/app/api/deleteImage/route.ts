// app/api/upload/delete/route.ts
import { NextResponse } from "next/server";
import { ConnectDB } from "@/utils/connectDB";
import ImageModel from "@/models/Image.model";

export async function DELETE(req: Request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false,error: "ID عکس لازم است" }, { status: 400 });

    const image = await ImageModel.findById(id);
    if (!image) return NextResponse.json({success: false, error: "عکس پیدا نشد" }, { status: 404 });

    await image.deleteOne();

    return NextResponse.json({ success: true, message: "عکس حذف شد" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({success: false, error: "خطا در حذف عکس" }, { status: 500 });
  }
}
