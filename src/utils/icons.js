import L from 'leaflet';
import IconCompany from '~/assets/office.svg';
import IconUser from '~/assets/placeholder.svg';

export const pointCompany = new L.Icon({
  iconUrl: IconCompany,
  iconRetinaUrl: IconCompany,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
});

export const pointUser = new L.Icon({
  iconUrl: IconUser,
  iconRetinaUrl: IconUser,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [25, 25],
});
