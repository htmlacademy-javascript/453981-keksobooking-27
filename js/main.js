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
const offerTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const offerCheckin = ['12:00', '13:00', '14:00'];
const offerCheckout = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function buildAuthor() {
  let userId;

  if (userIds.length === 10) {
    throw new Error('Cannot create more authors');
  }

  while (!userId || userIds.includes(userId)) {
    const randomNumber = getRandom(1, 10);

    if (randomNumber < 10) {
      userId = `0${randomNumber}`;
    } else {
      userId = `${randomNumber}`;
    }
  }

  userIds.push(userId);

  return {avatar: `img/avatars/user${userId}.png`};
}

function getFeatures(count) {
  if (isNaN(count) || count < 1 || count > features.length) {
    return [];
  }

  const usedFeatures = [];
  let feature;

  while (usedFeatures.length < count) {
    if (!feature || usedFeatures.includes(feature)) {
      feature = features[getRandom(0, features.length - 1)];
    } else {
      usedFeatures.push(feature);
    }
  }

  return usedFeatures;
}


function getPhotos(count) {
  if (isNaN(count) || count < 1 || count > photos.length) {
    return [];
  }

  const usedPhotos = [];
  let photo;

  while (usedPhotos.length < count) {
    if (!photo || usedPhotos.includes(photo)) {
      photo = photos[getRandom(0, photos.length - 1)];
    } else {
      usedPhotos.push(photo);
    }
  }

  return usedPhotos;
}

function buildOffer() {
  return {
    title: 'Сдам жильё в аренду',
    address: `${getRandomWithPrecision(35.65000, 35.70000, 5)}, ${getRandomWithPrecision(139.70000, 139.80000, 5)}`,
    price: getRandom(100, 100000),
    type: offerTypes[getRandom(0, offerTypes.length - 1)],
    rooms: getRandom(1, 6),
    guests: getRandom(1, 10),
    checkin: offerCheckin[getRandom(0, offerCheckin.length - 1)],
    checkout: offerCheckout[getRandom(0, offerCheckout.length - 1)],
    features: getFeatures(getRandom(0, features.length)),
    description: 'Уютное жильё для любителей спокойного отдыха',
    photos: getPhotos(getRandom(0, photos.length)),
  };
}

function buildLocation() {
  return {
    lat: getRandomWithPrecision(35.65000, 35.70000, 5),
    lng: getRandomWithPrecision(139.70000, 139.80000, 5),
  };
}

function buildBookingOffer() {
  return {
    author: buildAuthor(),
    offer: buildOffer(),
    location: buildLocation(),
  };
}

function generateBookingOffers() {
  const offers = [];

  for (let i = 1; i <= 10; i++) {
    offers.push(buildBookingOffer());
  }

  return offers;
}

generateBookingOffers();
