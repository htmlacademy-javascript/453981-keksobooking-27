import '../vendor/pristine/pristine.min.js';

const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFormFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');

const validator = new Pristine(adForm);

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

function getCapacityErrorMessage() {
  return `Для данного количества комнат (${roomNumber.value}) доступно размещение ${ROOM_NUMBER_CAPACITIES[roomNumber.value].text}`;
}

validator.addValidator(capacity,
  (value) => ROOM_NUMBER_CAPACITIES[roomNumber.value].values.includes(value),
  getCapacityErrorMessage);

adForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validator.validate()) {
    adForm.submit();
  }
});

export function setPageState(active) {
  adForm.classList.toggle('ad-form--disabled', !active);

  adFormHeader.disabled = !active;

  adFormElements.forEach((formElement) => {
    formElement.disabled = !active;
  });

  mapFiltersForm.classList.toggle('map__filters--disabled', !active);

  mapFormFilters.forEach((mapFormFilter) => {
    mapFormFilter.disabled = !active;
  });

  mapFeatures.disabled = !active;
}
