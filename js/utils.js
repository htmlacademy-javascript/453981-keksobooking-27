const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFormFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');

export const setAdFormState = (active) => {
  adForm.classList.toggle('ad-form--disabled', !active);

  adFormHeader.disabled = !active;

  adFormElements.forEach((formElement) => {
    formElement.disabled = !active;
  });
};

export const setMapFiltersState = (active) => {
  mapFiltersForm.classList.toggle('map__filters--disabled', !active);

  mapFormFilters.forEach((mapFormFilter) => {
    mapFormFilter.disabled = !active;
  });

  mapFeatures.disabled = !active;
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
