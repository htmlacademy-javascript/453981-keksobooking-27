const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFormFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');

export function getRandom(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const minNumber = Math.min(min, max);
  const maxNumber = Math.max(min, max);

  return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
}

export function getRandomWithPrecision(min, max, precision = 0) {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const minNumber = Math.min(min, max);
  const maxNumber = Math.max(min, max);

  return Number((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(precision));
}

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
