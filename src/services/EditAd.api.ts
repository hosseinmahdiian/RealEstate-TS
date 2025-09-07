import { ResponseInterface } from "@/interface/interfaces.interface";
import { AdvertisementType } from "@/types/dataType.type";
import axios from "axios";

export const EditAdAPI = async (
  data: AdvertisementType,
): Promise<ResponseInterface> => {
  try {
    const res = await axios.patch(`/api/Ad`, data);
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
