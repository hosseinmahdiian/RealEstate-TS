import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { hashPassword } from "@/utils/auth";
import { ConnectDB } from "@/utils/connectDB";
import { UserType } from "@/types/dataType.type";

export const PATCH = async (req: Request) => {
  const { password, fullName, mobile, profile, _id } = await req.json();

  try {
    await ConnectDB();

    const existUser: UserType | null = await User.findById(_id);
    if (!existUser) {
      return NextResponse.json(
        { success: false, error: "کاربر پیدا نشد" },
        { status: 404 },
      );
    }

    let hashedPassword;
    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { success: false, error: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
          { status: 422 },
        );
      }
      hashedPassword = await hashPassword(password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        password: hashedPassword || existUser.password,
        fullName: fullName || existUser.fullName,
        mobile: mobile ,
        profile: profile ,
      },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "آپدیت انجام نشد" },
        { status: 400 },
      );
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    return NextResponse.json(
      {
        success: true,
        message: "حساب کاربری با موفقیت ویرایش شد",
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
