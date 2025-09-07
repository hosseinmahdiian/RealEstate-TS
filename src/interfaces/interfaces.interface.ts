import { AdvertisementType } from "@/types/dataType.type";

export interface LatLngData {
  lat: number;
  lng: number;
}

export interface MAPProps {
  data: LatLngData | null;
  setData: (loc: LatLngData | null) => void;
  disabled?: boolean;
}

export interface ResponseInterface {
  success: boolean;
  message?: string;
  error?: string;
  data?: object;
}

export interface CardProps {
  ad: AdvertisementType & { _id?: string };
}
