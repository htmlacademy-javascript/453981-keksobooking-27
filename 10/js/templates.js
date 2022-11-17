const OFFER_TYPE_TEXTS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const popupTemplate = document
  .querySelector('#card')
  .content
  .querySelector('.popup');
const successMessageTemplate = document
  .querySelector('#success')
  .content
  .querySelector('.success');
const errorMessageTemplate = document
  .querySelector('#error')
  .content
  .querySelector('.error');

export function createCard(data) {
  const element = popupTemplate.cloneNode(true);
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
  const popupAvatar = element.querySelector('.popup__avatar');

  if (!data.offer.title) {
    popupTitle.remove();
  } else {
    popupTitle.textContent = data.offer.title;
  }

  if (!data.offer.address) {
    popupTextAddress.remove();
  } else {
    popupTextAddress.textContent = data.offer.address;
  }

  if (!data.offer.price) {
    popupTextPrice.remove();
  } else {
    popupTextPrice.textContent = `${data.offer.price} ₽/ночь`;
  }

  if (!data.offer.type) {
    popupType.remove();
  } else {
    popupType.textContent = OFFER_TYPE_TEXTS[data.offer.type];
  }

  if (!data.offer.rooms || !data.offer.guests) {
    popupTextCapacity.remove();
  } else {
    popupTextCapacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  }

  if (!data.offer.checkin || !data.offer.checkout) {
    popupTextTime.classList.remove();
  } else {
    popupTextTime.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  }

  if (data.offer.features && data.offer.features.length !== 0) {
    features.innerHTML = null;

    data.offer.features.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature', `popup__feature--${feature}`);

      features.appendChild(item);
    });
  } else {
    features.remove();
  }

  if (!data.offer.description) {
    popupDescription.remove();
  } else {
    popupDescription.textContent = data.offer.description;
  }

  if (data.offer.photos && data.offer.photos.length !== 0) {
    photos.innerHTML = null;

    data.offer.photos.forEach((item) => {
      const photoTemplate = photo.cloneNode(true);
      photoTemplate.src = item;
      photos.appendChild(photoTemplate);
    });
  } else {
    photos.remove();
  }

  if (!data.author.avatar) {
    popupAvatar.remove();
  } else {
    popupAvatar.src = data.author.avatar;
  }

  return element;
}

export function showSuccessMessage() {
  const successMessage = successMessageTemplate.cloneNode(true);

  function onSuccessMessageClose(event) {
    if (event.type === 'click' || event.key === 'Escape') {
      successMessage.removeEventListener('click', onSuccessMessageClose);
      document.removeEventListener('keyup', onSuccessMessageClose);
      successMessage.remove();
    }
  }

  document.body.appendChild(successMessage);

  successMessage.addEventListener('click', onSuccessMessageClose);
  document.addEventListener('keyup', onSuccessMessageClose);
}

export function showErrorMessage() {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const button = errorMessage.querySelector('.error__button');

  function onErrorMessageClose(event) {
    if (event.type === 'click' || event.key === 'Escape') {
      errorMessage.removeEventListener('click', onErrorMessageClose);
      document.removeEventListener('keyup', onErrorMessageClose);
      button.removeEventListener('click', onErrorMessageClose);
      errorMessage.remove();
    }
  }

  document.body.appendChild(errorMessage);

  button.addEventListener('click', onErrorMessageClose);
  errorMessage.addEventListener('click', onErrorMessageClose);
  document.addEventListener('keyup', onErrorMessageClose);
}
