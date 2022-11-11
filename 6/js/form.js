export function setPageState(active) {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.toggle('ad-form--disabled', !active);

  const adFormHeader = adForm.querySelector('.ad-form-header');
  adFormHeader.disabled = !active;

  const adFormElements = adForm.querySelectorAll('.ad-form__element');
  adFormElements.forEach((formElement) => {
    formElement.disabled = !active;
  });

  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.toggle('map__filters--disabled', !active);

  const mapFormFilters = mapFiltersForm.querySelectorAll('.map__filter');
  mapFormFilters.forEach((mapFormFilter) => {
    mapFormFilter.disabled = !active;
  });

  const mapFeatures = mapFiltersForm.querySelector('.map__features');
  mapFeatures.disabled = !active;
}
