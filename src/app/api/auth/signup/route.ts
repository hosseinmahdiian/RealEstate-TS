import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { hashPassword } from "@/utils/auth";
import { ConnectDB } from "@/utils/connectDB";
import { emailRegex } from "@/utils/Regex";

export const POST = async (req: Request) => {
  const { email, password, fullName, mobile } = await req.json();
  console.log(email, password, fullName, mobile);

  try {
    await ConnectDB();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: " اطلاعات را کامل وارد کنید" },
        { status: 422 },
      );
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "ایمیل وارد شده معتبر نیست" },
        { status: 422 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
        { status: 422 },
      );
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { success: false, error: "این ایمیل قبلا ثبت نام کرده است" },
        { status: 422 },
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      email,
      fullName,
      ...(mobile && { mobile }),
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      {
        success: true,
        message: "حساب کاربری با موفقیت ایجاد شد",
        data: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "سرور با مشکل مواجه شده است بعدا تلاش کنید" },
      { status: 500 },
    );
  }
};
