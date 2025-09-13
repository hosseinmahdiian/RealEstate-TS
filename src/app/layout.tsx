import "./globals.css";
import { ChildrenType } from "src/types/dataType.type";
import { YekanBakh } from "@/utils/fonts";
import Layout from "@/layout/Layout";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/provider/NextAuthProvider.provider";
import ReactQueryProvider from "@/provider/ReqctQuery.provider";

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
      lang="fa"
      dir="rtl"
      className={`${YekanBakh.variable} !font-YekanBakh h-full`}
    >
      <body className="relative container mx-auto h-full max-w-7xl px-2">
        <Toaster position="top-center" />
        <NextAuthProvider>
          <ReactQueryProvider>
            <Layout>{children}</Layout>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
