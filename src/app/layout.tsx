import "./globals.css";
import { ChildrenType } from "src/types/dataType.type";
import { YekanBakh } from "@/utils/fonts";
import { Toaster } from "react-hot-toast";
import Layout from "@/layout/Layout";
import ClientWrapper from "@/provider/ClientWrapper";
import { useTheme } from "next-themes";

export const metadata = {
  title: "پروژه املاک",
  description: "خرید و اجاره ملک را با ما تجربه کنید",
  themeColor: "#000000",
  icons: [
    {
      rel: "icon",
      url: "/icons/icon-192x192.png",
    },
  ],
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html
      suppressHydrationWarning
      lang="fa"
      dir="rtl"
      className={`${YekanBakh.variable} !font-YekanBakh h-full`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0d6efd" />
      </head>
      <body className="custom-bg text relative container mx-auto h-full max-w-7xl px-2">
        <Toaster position="top-center" />
        <ClientWrapper>
          <Layout>{children}</Layout>
        </ClientWrapper>
      </body>
    </html>
  );
}
