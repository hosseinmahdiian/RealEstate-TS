import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import Image from "@/models/Image";
import { ConnectDB } from "@/utils/connectDB";

// مهم: bodyParser رو غیرفعال می‌کنیم
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  await ConnectDB();

  return new Promise<NextResponse>((resolve, reject) => {
    const form = formidable({
      multiples: false,
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    form.parse(req as any, async (err, fields, files: any) => {
      if (err) return reject(NextResponse.json({ message: err.message }, { status: 500 }));

      const file = files.file;
      const filename = file.newFilename || file.originalFilename;
      const url = `/uploads/${filename}`;

      // ذخیره در MongoDB
      const newImage = new Image({ filename, url });
      await newImage.save();

      resolve(NextResponse.json({ message: "File uploaded", image: newImage }));
    });
  });
}
