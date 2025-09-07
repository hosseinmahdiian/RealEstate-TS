// app/api/upload/multiple/route.ts
import { NextResponse } from "next/server";
import { ConnectDB } from "@/utils/connectDB";
import ImageModel from "@/models/Image.model";

export async function POST(req: Request) {
  try {
    await ConnectDB();
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "هیچ فایلی ارسال نشد" },
        { status: 400 },
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const newImage = await ImageModel.create({
        filename: file.name,
        data: buffer,
        contentType: file.type,
      });

      uploadedImages.push({
        id: newImage._id,
        filename: newImage.filename,
        url: `/api/image?id=${newImage._id}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "آپلود موفق",
      images: uploadedImages,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "خطا در آپلود" },
      { status: 500 },
    );
  }
}
