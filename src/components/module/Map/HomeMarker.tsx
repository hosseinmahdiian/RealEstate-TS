"use client";
import { Marker, Popup } from "react-leaflet";
import { homeIcon } from "./MapIcons";

import { AdvertisementType } from "@/types/dataType.type";
import { useRouter } from "next/navigation";

const HomeMarker = ({ data }: { data: AdvertisementType }) => {
  const router = useRouter();
  const { location, title, _id } = data;
  console.log(data);

  if (!location?.lat || !location?.lng) return null;

  return (
    <Marker
      position={[+location?.lat, +location?.lng]}
      icon={homeIcon}
      eventHandlers={{
        click: () => router.push(`/advertisement/${_id}`),
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          e.target.closePopup();
        },
      }}
    >
      <Popup closeButton={false}>{title}</Popup>
    </Marker>
  );
};
export default HomeMarker;
