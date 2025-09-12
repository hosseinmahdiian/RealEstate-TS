import axios from "axios";
export interface UploadGalleryResponse {
  success: boolean;
  urls?: string[];
  error?: string;
  images?: object[];
}
export const UploadGalleryAPI = async (
  formData: FormData,
): Promise<UploadGalleryResponse> => {
  try {
    const res = await axios.post<UploadGalleryResponse>(
      "/api/upload/gallery",
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
