import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const FetchAddressNeshan = async (
  lat: string,
  lng: string,
  setAddress: Dispatch<SetStateAction<string>>,
) => {
  try {
    const response = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
      { headers: { "Api-Key": process.env.NESHAN_API_KEY } },
    );
    const data = response.data;
    setAddress(data.formatted_address);
    // console.log(data.formatted_address);
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};
