import axios from "axios";
import { LogInType } from "@/types/dataType.type";

export const SignUp = async (
  data: LogInType & { fullName: string; mobile?: string },
) => {
  try {
    const res = await axios.post("/api/auth/signup", data);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error(error.response?.data || error.message || error);
    return {
      success: false,
      error: error.response?.data?.error || "خطایی رخ داده",
    };
  }
};
