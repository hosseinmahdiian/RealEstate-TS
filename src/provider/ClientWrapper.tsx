// src/components/ClientWrapper.tsx
"use client";
import { ReactNode, useEffect } from "react";
import NextAuthProvider from "@/provider/NextAuthProvider.provider";
import ReactQueryProvider from "@/provider/ReqctQuery.provider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(console.log);
    }
  }, []);

  return (
    <NextAuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextAuthProvider>
  );
}
