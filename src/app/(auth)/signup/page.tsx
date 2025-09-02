import { authOptions } from "@/api/auth/[...nextauth]/route";
import SignUpPage from "@/components/template/SignUpPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getServerSession(authOptions);
  session && redirect("/");
  return <SignUpPage />;
};

export default SignUp;
