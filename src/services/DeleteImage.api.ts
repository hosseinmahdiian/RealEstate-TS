import axios from "axios";
interface DeleteImageResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const DeleteImageAPI = async (
  id: string,
): Promise<DeleteImageResponse> => {
  try {
    const res = await axios.delete(`/api/delete/image?id=${id}`);
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
