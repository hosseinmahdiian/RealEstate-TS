import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName: string;
      profile?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    fullName: string;
    profile?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName: string;
    profile?: string;
  }
}
