"use client";

import dynamic from "next/dynamic";
import { MAPProps } from "@/interface/interfaces.interface";
import { useQuery } from "@tanstack/react-query";
import { GetAdAPI } from "@/services/GetAd.api";

const MapMain = dynamic(() => import("@/module/Map/MapMain"), {
  ssr: false,
});

interface MapWrapperProps extends MAPProps {}

export default function MapWrapper(props: MapWrapperProps) {
  const { data, isPending, error } = useQuery({
    queryKey: ["GetAd"],
    queryFn: GetAdAPI,
  });

  if (isPending) return <p>در حال بارگذاری موارد...</p>;
  if (error) throw error;
  return <MapMain items={data?.data} />;
}
