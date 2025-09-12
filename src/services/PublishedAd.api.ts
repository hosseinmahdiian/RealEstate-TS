import { ResponseInterface } from "@/interface/interfaces.interface";
import axios from "axios";

export const PublishedAdAPI = async (
  id: string,
): Promise<ResponseInterface> => {
  try {
    const res = await axios.patch(`/api/Ad/${id}/published`);
    return res.data;
  } catch (error: any) {
    console.error(error?.response?.data || error?.message || error);
    return {
      success: false,
      error: error.response?.data?.error || "خطایی رخ داده",
    };
  }
};
