import { authOptions } from "@/api/auth/[...nextauth]/route";
import SignUpPage from "@/template/SignUpPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ثبت نام",
  // description: "خرید و اجاره ملاک را باما تجربه کنید",
};
const SignUp = async () => {
  const session = await getServerSession(authOptions);
  session && redirect("/");
  return <SignUpPage />;
};

export default SignUp;
