// app/api/image/route.ts
import { NextResponse } from "next/server";
import { ConnectDB } from "@/utils/connectDB";
import ImageModel from "@/models/Image.model";

export async function GET(req: Request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID عکس لازم است" }, { status: 400 });

    const image = await ImageModel.findById(id);
    if (!image) return NextResponse.json({ error: "عکس پیدا نشد" }, { status: 404 });

    return new NextResponse(image.data, {
      status: 200,
      headers: { "Content-Type": image.contentType },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در خواندن عکس" }, { status: 500 });
  }
}
