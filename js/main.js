const OFFERS_COUNT = 10;
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const AUTHORS_MAX_COUNT = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 6;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LOCATION_PRECISION = 5;

function getRandom(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const minNumber = Math.min(min, max);
  const maxNumber = Math.max(min, max);

  return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
}

function getRandomWithPrecision(min, max, precision = 0) {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const minNumber = Math.min(min, max);
  const maxNumber = Math.max(min, max);

  return Number((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(precision));
}

const userIds = [];

function buildAuthor() {
  let userId;

  if (userIds.length === AUTHORS_MAX_COUNT) {
    throw new Error('Cannot create more authors');
  }

  while (!userId || userIds.includes(userId)) {
    const randomNumber = getRandom(1, AUTHORS_MAX_COUNT);

    if (randomNumber < 10) {
      userId = `0${randomNumber}`;
    } else {
      userId = `${randomNumber}`;
    }
  }

  userIds.push(userId);

  return {avatar: `img/avatars/user${userId}.png`};
}

function getRandomItems(count, itemsArray) {
  if (isNaN(count) || count < 1 || count > itemsArray.length) {
    return [];
  }

  const usedItems = [];
  let item;

  while (usedItems.length < count) {
    if (!item || usedItems.includes(item)) {
      item = itemsArray[getRandom(0, itemsArray.length - 1)];
    } else {
      usedItems.push(item);
    }
  }

  return usedItems;
}

function buildOffer(location) {
  return {
    title: 'Сдам жильё в аренду',
    address: `${location.lat}, ${location.lng}`,
    price: getRandom(MIN_PRICE, MAX_PRICE),
    type: OFFER_TYPES[getRandom(0, OFFER_TYPES.length - 1)],
    rooms: getRandom(MIN_ROOMS, MAX_ROOMS),
    guests: getRandom(MIN_GUESTS, MAX_GUESTS),
    checkin: OFFER_CHECKIN[getRandom(0, OFFER_CHECKIN.length - 1)],
    checkout: OFFER_CHECKOUT[getRandom(0, OFFER_CHECKOUT.length - 1)],
    features: getRandomItems(getRandom(0, FEATURES.length), FEATURES),
    description: 'Уютное жильё для любителей спокойного отдыха',
    photos: getRandomItems(getRandom(0, PHOTOS.length), PHOTOS),
  };
}

function buildLocation() {
  return {
    lat: getRandomWithPrecision(LAT_MIN, LAT_MAX, LOCATION_PRECISION),
    lng: getRandomWithPrecision(LNG_MIN, LNG_MAX, LOCATION_PRECISION),
  };
}

function buildBookingOffer() {
  const location = buildLocation();

  return {
    author: buildAuthor(),
    offer: buildOffer(location),
    location,
  };
}

function generateBookingOffers() {
  const offers = [];

  for (let i = 1; i <= OFFERS_COUNT; i++) {
    offers.push(buildBookingOffer());
  }

  return offers;
}

generateBookingOffers();
