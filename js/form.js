const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFormFilters = mapFiltersForm.querySelectorAll('.map__filter');
const mapFeatures = mapFiltersForm.querySelector('.map__features');

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
