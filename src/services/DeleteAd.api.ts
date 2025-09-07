import { ResponseInterface } from "@/interface/interfaces.interface";
import { AdvertisementType } from "@/types/dataType.type";
import axios from "axios";

export const DeleteAdAPI = async (id: string): Promise<ResponseInterface> => {
  console.log(id);

  try {
    const res = await axios.delete(`/api/Ad/delete?id=${id}`);
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
