import { ResponseInterface } from "@/interface/interfaces.interface";
import { AdvertisementType, UserType } from "@/types/dataType.type";
import axios from "axios";

export const EditUserAPI = async (
  data: Partial<UserType>,
): Promise<ResponseInterface> => {
  try {
    const res = await axios.patch(`/api/auth/user`, data);
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
