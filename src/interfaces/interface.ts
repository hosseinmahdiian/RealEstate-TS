export interface LatLngData {
  lat: number;
  lng: number;
}

export interface MAPProps {
  data: LatLngData | null;
  setData: (loc: LatLngData | null) => void;
}
