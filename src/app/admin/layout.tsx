import DashboardLayout from "@/layout/DashboardLayout";
import { ChildrenType } from "src/types/dataType.type";

export const metadata = {
  title: "داشبرد ادمین",
  // description: "خرید و اجاره ملاک را باما تجربه کنید",
};

export default async function RootLayout({ children }: ChildrenType) {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
}
