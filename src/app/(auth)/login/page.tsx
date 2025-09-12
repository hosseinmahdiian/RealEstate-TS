import { authOptions } from "@/api/auth/[...nextauth]/route";
import LogInPage from "@/template/LogInPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const metadata = {
  title: "ورودص",
  // description: "خرید و اجاره ملاک را باما تجربه کنید",
};
const SignUp = async () => {
  const session = await getServerSession(authOptions);
  session && redirect("/");
  return <LogInPage />;
};

export default SignUp;
