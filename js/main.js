import { generateBookingOffers } from './data.js';
import { createCard } from './templates.js';
import './form.js';

const map = document.querySelector('#map-canvas');

const offers = generateBookingOffers();

offers.forEach((offer) => {
  map.appendChild(createCard(offer));
});
