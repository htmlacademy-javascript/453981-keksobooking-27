import { getOffers } from './api.js';
import { createCard } from './templates.js';
import { setPageState, debounce } from './utils.js';

const TOKYO_LAT = 35.68950;
const TOKYO_LNG = 139.69171;
const ZOOM = 10;
const MAX_ZOOM = 30;
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const COORDINATES_PRECISION = 5;
const LOW_HOUSING_PRICE = 10000;
const HIGH_HOUSING_PRICE = 50000;
const MAX_DISPLAYED_OFFERS = 10;

const mapFiltersForm = document.querySelector('.map__filters');
const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingFeatures = mapFiltersForm.querySelector('#housing-features');
const address = document.querySelector('#address');

let selectedFeatures = [];

const map = L.map('map-canvas');
const markers = L.layerGroup().addTo(map);

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

function onMarkerMove(event) {
  const { lat, lng } = event.target.getLatLng();
  address.value = `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(COORDINATES_PRECISION)}`;
}

function renderOffer(offer) {
  L.marker({
    lat: offer.location.lat,
    lng: offer.location.lng,
  }, {
    icon: pinIcon,
  })
    .addTo(markers)
    .bindPopup(createCard(offer));
}

function checkHousingType(type, offer) {
  if (type === 'any') {
    return true;
  }

  return offer.type === type;
}

function checkPrice(price, offer) {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.price < LOW_HOUSING_PRICE;
    case 'high':
      return offer.price > HIGH_HOUSING_PRICE;
    default:
      return HIGH_HOUSING_PRICE >= offer.price && offer.price >= LOW_HOUSING_PRICE;
  }
}

function checkGuests(guestsCount, offer) {
  if (guestsCount === 'any') {
    return true;
  }

  return offer.guests === Number(guestsCount);
}

function checkRooms(rooms, offer) {
  if (rooms === 'any') {
    return true;
  }

  return offer.rooms === Number(rooms);
}

function checkFeatures(offer) {
  return selectedFeatures.every((feature) => offer.features?.includes(feature) ?? false);
}

function updateMap() {
  resetMarkers();

  getOffers(async (data) => {
    const offers = await data.json();

    offers
      .filter(({ offer }) => checkHousingType(housingType.value, offer) &&
        checkPrice(housingPrice.value, offer) &&
        checkGuests(housingGuests.value, offer) &&
        checkRooms(housingRooms.value, offer) &&
        checkFeatures(offer))
      .slice(0, MAX_DISPLAYED_OFFERS)
      .forEach(renderOffer);
  }, () => {
    const requestError = requestErrorTemplate.cloneNode(true);
    const button = requestError.querySelector('.error__button');

    document.body.appendChild(requestError);
    button.addEventListener('click', () => {
      requestError.remove();
    });
  });
}

mapFiltersForm.addEventListener('change', debounce(() => {
  updateMap();
}));

housingFeatures.addEventListener('change', () => {
  selectedFeatures = Array
    .from(housingFeatures.querySelectorAll('input[type="checkbox"]:checked'))
    .map(({ value }) => value);
});

map.on('load', () => {
  setPageState(true);
  updateMap();
}).setView([TOKYO_LAT, TOKYO_LNG], ZOOM);

export function resetMapState() {
  updateMap();
  map.setView([TOKYO_LAT, TOKYO_LNG], ZOOM);
  map.closePopup();
  mainMarker.setLatLng([TOKYO_LAT, TOKYO_LNG]);
}

function resetMarkers() {
  markers.clearLayers();
}

mainMarker.addTo(map);
mainMarker.on('move', onMarkerMove);
