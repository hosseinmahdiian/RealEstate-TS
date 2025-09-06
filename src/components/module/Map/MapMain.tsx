"use client";

import { FC, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression, Map as LeafletMap } from "leaflet";
import { MAPProps } from "src/interfaces/interface";
import LocationMarker from "./LocationMarker";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { userIcon } from "./MapIcons";

const MAP: FC<MAPProps> = ({ data, setData }) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const center: LatLngExpression = [35.6997, 51.3379];

  const [position, setPosition] = useState<LatLng | null>(null);

  const locateUser = () => {
    if (!mapRef.current) return;
    mapRef.current.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      mapRef.current!.flyTo(e.latlng, mapRef.current!.getZoom());
    });
  };

  return (
    <div className="relative z-0 h-full w-full overflow-hidden rounded-xl">
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
        <LocationMarker data={data} setData={setData} mapRef={mapRef} />
        {position && <Marker icon={userIcon} position={position} />}
      </MapContainer>
      <span
        className="leaflet-map-pane absolute right-4 bottom-5 !z-[1000000000] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
        onClick={locateUser}
      >
        <FaLocationCrosshairs className="text-xl" />
      </span>
    </div>
  );
};

export default MAP;
