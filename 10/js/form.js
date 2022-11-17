import '../vendor/pristine/pristine.min.js';
import { createOffer } from './api.js';
import { resetMapState } from './map.js';
import { showErrorMessage, showSuccessMessage } from './templates.js';

const ROOM_NUMBER_CAPACITIES = {
  1: {
    values: ['1'],
    text: '1 гостя',
  },
  2: {
    values: ['1', '2'],
    text: '1 или 2 гостей',
  },
  3: {
    values: ['1', '2', '3'],
    text: '1, 2 или 3 гостей',
  },
  100: {
    values: ['0'],
    text: 'не для гостей',
  },
};

const HOUSING_TYPE_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MAX_SLIDER_VALUE = 100000;
const SLIDER_STEP = 1000;

const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const slider = adForm.querySelector('.ad-form__slider');
const resetButton = adForm.querySelector('.ad-form__reset');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: MAX_SLIDER_VALUE,
  },
  start: 0,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => Number(value),
  },
});

const validator = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
});

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
});

validator.addValidator(capacity,
  (value) => ROOM_NUMBER_CAPACITIES[roomNumber.value].values.includes(value),
  () => `Для данного количества комнат (${roomNumber.value}) доступно размещение ${ROOM_NUMBER_CAPACITIES[roomNumber.value].text}`);

validator.addValidator(price,
  (value) => Number(value) >= HOUSING_TYPE_PRICES[type.value],
  () => `Минимальная цена для выбранного типа жилья \u2014 ${HOUSING_TYPE_PRICES[type.value]}`);

type.addEventListener('change', (event) => {
  price.placeholder = HOUSING_TYPE_PRICES[event.target.value];
  price.min = HOUSING_TYPE_PRICES[event.target.value];
});

price.addEventListener('change', (event) => {
  slider.noUiSlider.set(event.target.value);
});

timeIn.addEventListener('change', (event) => {
  timeOut.value = event.target.value;
});

timeOut.addEventListener('change', (event) => {
  timeIn.value = event.target.value;
});

adForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validator.validate()) {
    createOffer(new FormData(adForm))
      .then(() => {
        adForm.reset();
        mapFiltersForm.reset();
        slider.noUiSlider.reset();
        resetMapState();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      });
  }
});

resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  adForm.reset();
  mapFiltersForm.reset();
  validator.reset();
  slider.noUiSlider.reset();
  resetMapState();
});
