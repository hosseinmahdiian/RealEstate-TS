import { ResponseInterface } from "@/interface/interfaces.interface";
import axios from "axios";

export const GetAdAPI = async (): Promise<ResponseInterface> => {
  try {
    const res = await axios.get(`/api/Ad`);
    console.log(res.data);
    return res.data;
  } catch (error: any) {
    console.error(error?.response?.data || error?.message || error);
    return {
      success: false,
      error: error.response?.data?.error || "خطایی رخ داده",
    };
  }
};
