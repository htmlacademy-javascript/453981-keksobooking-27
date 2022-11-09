const VISUALLY_HIDDEN_CLASS = 'visually-hidden';

const OFFER_TYPE_TEXTS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

export function createCard(data) {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const fragment = document.createDocumentFragment();
  const element = template.cloneNode(true);

  const popupTitle = element.querySelector('.popup__title');
  const popupTextAddress = element.querySelector('.popup__text--address');
  const popupTextPrice = element.querySelector('.popup__text--price');
  const popupType = element.querySelector('.popup__type');
  const popupTextCapacity = element.querySelector('.popup__text--capacity');
  const popupTextTime = element.querySelector('.popup__text--time');
  const features = element.querySelector('.popup__features');
  const popupDescription = element.querySelector('.popup__description');
  const photos = element.querySelector('.popup__photos');
  const photo = element.querySelector('.popup__photo');

  if (!data.offer.title) {
    popupTitle.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupTitle.textContent = data.offer.title;
  }

  if (!data.offer.address) {
    popupTextAddress.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupTextAddress.textContent = data.offer.address;
  }

  if (!data.offer.price) {
    popupTextPrice.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupTextPrice.textContent = `${data.offer.price} ₽/ночь`;
  }

  if (!data.offer.type) {
    popupType.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupType.textContent = OFFER_TYPE_TEXTS[data.offer.type];
  }

  if (!data.offer.rooms || !data.offer.guests) {
    popupTextCapacity.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupTextCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  }

  if (!data.offer.checkin || !data.offer.checkout) {
    popupTextTime.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupTextTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  }

  if (data.offer.features.length !== 0) {
    features.innerHTML = null;

    data.offer.features.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature', `popup__feature--${feature}`);

      features.appendChild(item);
    });
  } else {
    features.classList.add(VISUALLY_HIDDEN_CLASS);
  }

  if (!data.offer.description) {
    popupDescription.classList.add(VISUALLY_HIDDEN_CLASS);
  } else {
    popupDescription.textContent = data.offer.description;
  }

  if (data.offer.photos.length !== 0) {
    photos.innerHTML = null;

    data.offer.photos.forEach((item) => {
      const photoTemplate = photo.cloneNode(true);
      photoTemplate.src = item;
      photos.appendChild(photoTemplate);
    });
  } else {
    photos.classList.add(VISUALLY_HIDDEN_CLASS);
  }

  element.querySelector('.popup__avatar').src = data.author.avatar;

  fragment.appendChild(element);

  return fragment;
}
