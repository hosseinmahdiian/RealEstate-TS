"use client";
import { ChildrenType } from "@/types/dataType.type";
import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }: ChildrenType) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
