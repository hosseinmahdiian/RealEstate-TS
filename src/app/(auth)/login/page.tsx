import { authOptions } from "@/api/auth/[...nextauth]/route";
import LogInPage from "@/template/LogInPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  session && redirect("/");
  return <LogInPage />;
};

export default SignUp;
