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
