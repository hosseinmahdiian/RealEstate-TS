"use client";
import { Marker, Popup } from "react-leaflet";
import { homeIcon } from "./MapIcons";

import { AdvertisementType } from "@/types/dataType.type";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { EditViewAdAPI } from "@/services/EditViewAd.api";
import { ResponseInterface } from "@/interface/interfaces.interface";

const HomeMarker = ({ data }: { data: AdvertisementType }) => {
  const router = useRouter();
  const { location, title, _id } = data;
  console.log(data);

  if (!location?.lat || !location?.lng) return null;
  const { mutate: mutateEditViewAd, isPending: isPendingEditViewAd } =
    useMutation({
      mutationKey: ["EditViewAd"],
      mutationFn: EditViewAdAPI,
      onSuccess: (data: ResponseInterface) => {
        if (data?.success) {
          console.log(data.message || "ویرایش شد");
        } else {
          console.log(data.error || "خطایی رخ داده است");
        }
      },
    });
  return (
    <Marker
      position={[+location?.lat, +location?.lng]}
      icon={homeIcon}
      eventHandlers={{
        click: () => {
          router.push(`/advertisement/${_id}`);
          mutateEditViewAd(String(_id));
        },
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          e.target.closePopup();
        },
      }}
    >
      <Popup
        closeButton={false}
        className="ml-2 !border-0 !bg-transparent !shadow-none"
        autoClose={false}
        closeOnClick={false}
      >
        <div className="w-60 rounded-lg bg-white p-3 shadow-lg">
          <h3 className="text-lg font-bold text-right">{title}</h3>
        </div>
      </Popup>
    </Marker>
  );
};
export default HomeMarker;
