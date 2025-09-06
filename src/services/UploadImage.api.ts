import axios from "axios";
interface UploadImageResponse {
  success: boolean;
  image?: { url: string; id: string; filename: string };
  error?: string;
  id?: string;
}
export const UploadImageAPI = async (
  formData: FormData,
): Promise<UploadImageResponse> => {
  try {
    const res = await axios.post<UploadImageResponse>(
      "/api/upload/image",
      formData,
    );
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
