"use client";

import { FC, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression, Map as LeafletMap } from "leaflet";
import { MAPProps } from "@/interface/interfaces.interface";
import LocationMarker from "./LocationMarker";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { userIcon } from "./MapIcons";
import Bg_Modal from "../BgModal";
import { FaHome } from "react-icons/fa";

const MAP: FC<MAPProps> = ({
  data,
  setData = () => {},
  disabled = false,
  show = false,
}) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const center: LatLngExpression = data
    ? [+data.lat, +data.lng]
    : [35.6997, 51.3379];

  useEffect(() => {
    if (!mapRef.current) return;
    if (data?.lat && data?.lng) {
      const lat = Number(data.lat);
      const lng = Number(data.lng);
      mapRef.current.setView([lat, lng], mapRef.current.getZoom());
    }
  }, [data]);

  const [position, setPosition] = useState<LatLng | null>(null);

  const locateUser = () => {
    if (!mapRef.current) return;
    mapRef.current.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      mapRef.current!.flyTo(e.latlng, mapRef.current!.getZoom());
    });
  };

  const locatePlace = () => {
    if (!mapRef.current || !data?.lat || !data?.lng) return;
    mapRef.current.flyTo([+data.lat, +data.lng], mapRef.current.getZoom());
  };

  return (
    <div className="relative z-0 h-full w-full overflow-hidden rounded-xl">
      <Bg_Modal
        modal={disabled}
        setModal={() => {}}
        z="!absolute !z-[100000] top-0 !bg-gray-300 !cursor-not-allowed"
      />
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          // url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          // url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
          // url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
          // url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"
          // url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x"
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x"
          // url=" https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          // url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker
          data={data}
          setData={setData}
          mapRef={mapRef}
          show={show}
        />
        {position && <Marker icon={userIcon} position={position} />}
      </MapContainer>
      {data?.lat && data?.lng && (
        <span
          className="leaflet-map-pane absolute right-4 bottom-14 !z-[2000] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
          onClick={locatePlace}
        >
          <FaHome className="text-xl" />
        </span>
      )}
      <span
        className="leaflet-map-pane absolute right-4 bottom-5 !z-[2000] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
        onClick={locateUser}
      >
        <FaLocationCrosshairs className="text-xl" />
      </span>
    </div>
  );
};

export default MAP;
