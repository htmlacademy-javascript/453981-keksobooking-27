import { generateBookingOffers } from './data.js';
import { createCard } from './templates.js';
import { setPageState } from './form.js';

const TOKYO_LAT = 35.68950;
const TOKYO_LNG = 139.69171;
const ZOOM = 12;
const MAX_ZOOM = 30;
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const COORDINATES_PRECISION = 5;

const address = document.querySelector('#address');
const map = L.map('map-canvas');

L.tileLayer(TILE_LAYER_URL, {
  maxZoom: MAX_ZOOM,
  attribution: TILE_LAYER_ATTRIBUTION
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

address.value = `${TOKYO_LAT}, ${TOKYO_LNG}`;

const onMarkerMove = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(COORDINATES_PRECISION)}`;
};

map.on('load', () => {
  setPageState(true);
  generateBookingOffers().forEach((offer) => {
    L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    }, {
      icon: pinIcon,
    })
      .addTo(map)
      .bindPopup(createCard(offer));
  });
}).setView({
  lat: TOKYO_LAT,
  lng: TOKYO_LNG,
}, ZOOM);

mainMarker.addTo(map);
mainMarker.on('move', onMarkerMove);
