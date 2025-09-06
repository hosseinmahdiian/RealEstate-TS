// app/api/upload/single/route.ts
import { NextResponse } from "next/server";
import { ConnectDB } from "@/utils/connectDB";
import ImageModel from "@/models/Image.model";

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "هیچ فایلی ارسال نشد" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const newImage = await ImageModel.create({
      filename: file.name,
      data: buffer,
      contentType: file.type,
    });

    const url = `/api/image?id=${newImage._id}`; // URL برای نمایش در frontend

    return NextResponse.json(
      {
        success: true,
        message: "آپلود موفق",
        image: { id: newImage._id, filename: newImage.filename, url },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "خطا در آپلود" },
      { status: 500 },
    );
  }
}
