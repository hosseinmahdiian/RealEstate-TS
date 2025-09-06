import axios from "axios";

export const FetchAddressNeshan = async (data: {
  lat: string | number;
  lng: string | number;
}) => {
  console.log(process?.env?.NEXT_PUBLIC_NESHAN_API_KEY);

  try {
    const response = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${data.lat}&lng=${data.lng}`,
      {
        headers: { "Api-Key": process.env.NEXT_PUBLIC_NESHAN_API_KEY! },
      },
    );
    return response.data;
    
    // console.log(data.formatted_address);
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};
