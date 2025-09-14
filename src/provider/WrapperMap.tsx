"use client";

import dynamic from "next/dynamic";
import { MAPProps } from "@/interface/interfaces.interface";

const MapMain = dynamic(() => import("@/module/Map/MapMain"), {
  ssr: false,
});

interface MapWrapperProps extends MAPProps {}

export default function MapWrapper(props: MapWrapperProps) {
  return <MapMain {...props} />;
}
