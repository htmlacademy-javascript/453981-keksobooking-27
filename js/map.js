import { getOffers } from './api.js';
import { createCard } from './templates.js';
import { setPageState } from './utils.js';

const TOKYO_LAT = 35.68950;
const TOKYO_LNG = 139.69171;
const ZOOM = 10;
const MAX_ZOOM = 30;
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const COORDINATES_PRECISION = 5;

const address = document.querySelector('#address');
const map = L.map('map-canvas');

const requestErrorTemplate = document
  .querySelector('#request-error')
  .content
  .querySelector('.error');

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

address.value = `${TOKYO_LAT.toFixed(COORDINATES_PRECISION)}, ${TOKYO_LNG.toFixed(COORDINATES_PRECISION)}`;

const onMarkerMove = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(COORDINATES_PRECISION)}`;
};

map.on('load', () => {
  setPageState(true);
  getOffers(async (data) => {
    const offers = await data.json();
    offers.forEach((offer) => {
      L.marker({
        lat: offer.location.lat,
        lng: offer.location.lng,
      }, {
        icon: pinIcon,
      })
        .addTo(map)
        .bindPopup(createCard(offer));
    });
  }, () => {
    const requestError = requestErrorTemplate.cloneNode(true);
    const button = requestError.querySelector('.error__button');

    document.body.appendChild(requestError);
    button.addEventListener('click', () => {
      requestError.remove();
    });
  });
}).setView([TOKYO_LAT, TOKYO_LNG], ZOOM);

export function resetMapState() {
  map.setView([TOKYO_LAT, TOKYO_LNG], ZOOM);
  map.closePopup();
  mainMarker.setLatLng([TOKYO_LAT, TOKYO_LNG]);
}

mainMarker.addTo(map);
mainMarker.on('move', onMarkerMove);
