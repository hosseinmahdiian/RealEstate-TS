import User from "@/models/user.model";
import { verifyPassword } from "@/utils/auth";
import { ConnectDB } from "@/utils/connectDB";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {};
        if (!email || !password)
          throw new Error("ایمیل و پسورد را درست وارد کنید");

        if (password.length < 8) {
          throw new Error("رمز عبور باید حداقل ۸ کاراکتر باشد");
        }

        try {
          await ConnectDB();
        } catch {
          throw new Error("سرور با مشکل مواجه شده است، بعداً تلاش کنید");
        }

        const existUser = await User.findOne({ email });
        if (!existUser) throw new Error("این ایمیل ثبت نام نشده است");
        console.log(existUser);

        const isValid = await verifyPassword(password, existUser.password);
        if (!isValid) throw new Error("رمز عبور یا ایمیل اشتباه است");

        return {
          id: existUser._id.toString(),
          email: existUser.email,
          fullName: existUser.fullName,
          profile: existUser.profile,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.profile = user.profile;
      }
      if (trigger === "update" && session?.user) {
        token.fullName = session.user.fullName;
        token.profile = session.user.profile;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.fullName = token.fullName as string;
        session.user.profile = token.profile as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
