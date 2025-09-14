"use client";
import { useMapEvents, Marker, Popup } from "react-leaflet";
import { FC, MutableRefObject, useEffect, useState } from "react";
import { ShopIcon } from "./MapIcons";
import { LeafletMouseEvent, Map } from "leaflet";
import { LatLngData } from "@/interface/interfaces.interface";
import Image from "next/image";
import location from "public/icons/location.png";

const LocationMarker: FC<{
  data: LatLngData | null;
  setData: (d: LatLngData | null) => void;
  mapRef: MutableRefObject<Map | null>;
  show?: boolean;
}> = ({ data, setData, mapRef, show }) => {
  const [moving, setMoving] = useState<boolean>(false);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (!data) {
      const handleClick = () => {
        const center = map.getCenter();
        setData({ lat: center.lat, lng: center.lng });
        map.off("click", handleClick);
      };

      const handleMoveStart = () => setMoving(true);
      const handleMoveEnd = () => setMoving(false);

      map.on("movestart", handleMoveStart);
      map.on("moveend", handleMoveEnd);
      map.on("click", handleClick);
      return () => {
        map.off("click", handleClick);
      };
    }
  }, [data]);

  return data?.lat && data?.lng ? (
    <Marker
      position={[+data.lat, +data.lng]}
      icon={ShopIcon}
      eventHandlers={{
        click: () => !show && setData(null),
      }}
    >
      <Popup>موقعیت ملک</Popup>
    </Marker>
  ) : (
    <div className="pointer-events-none absolute top-[calc(45%)] left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
      <Image
        src={location}
        alt="marker"
        className={`z-20 h-8 w-8 object-contain ease-in-out ${moving && "mb-1 !h-9 !w-9"}`}
      />
      <div
        className={`${moving && "mb- !h-2 !w-2"} absolute inset-x-0 top-[calc(80%)] z-10 mx-auto h-0 w-0 rounded-full bg-gray-800 opacity-50 ease-in-out`}
      ></div>
    </div>
  );
};
export default LocationMarker;
