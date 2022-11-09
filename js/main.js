import { generateBookingOffers } from './data.js';
import { createCard } from './templates.js';

const map = document.querySelector('#map-canvas');

const offers = generateBookingOffers();

offers.forEach((offer) => {
  map.appendChild(createCard(offer));
});
