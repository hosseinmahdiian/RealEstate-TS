// src/components/ClientWrapper.tsx
"use client";
import { ReactNode, useEffect } from "react";
import NextAuthProvider from "@/provider/NextAuthProvider.provider";
import ReactQueryProvider from "@/provider/ReqctQuery.provider";
import { ThemeProvider } from "next-themes";
// import { ThemeProvider } from "./ThemeProvider";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(console.log);
    }
  }, []);

  return (
    <ThemeProvider attribute="data-theme" enableSystem>
      <NextAuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextAuthProvider>
     </ThemeProvider>
  );
}
