import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
const LogOutButton = () => {
  const router = useRouter();
  const signOutHandler = () => {
    signOut();
    router.push("/login");
  };
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <LuLogOut className="text-xl font-bold text-blue-500" />
      <p
        className="font- text-center text-red-500"
        onClick={() => {
          signOutHandler();
        }}
      >
        خروج از حساب کاری{" "}
      </p>
    </div>
  );
};

export default LogOutButton;
