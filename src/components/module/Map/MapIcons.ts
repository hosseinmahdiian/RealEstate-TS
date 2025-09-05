import { Icon } from "leaflet";
import location from "public/images/location.png";
import myLocation from "public/images/myLocation.png";

export const userIcon = new Icon({
  iconUrl: myLocation.src,
  iconSize: [30, 30],
  iconAnchor: [16, 18],
  popupAnchor: [0, -38],
});

export const ShopIcon = new Icon({
  iconUrl: location.src,
  iconSize: [20, 30],
  iconAnchor: [10, 35],
  popupAnchor: [0, -38],
});