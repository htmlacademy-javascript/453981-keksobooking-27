function getRandom(min, max, decimals) {
  const multiplier = 10 ** (decimals || 0);
  const scaleMin = min * multiplier;
  const scaleMax = max * multiplier;

  return Math.round(Math.random() * (scaleMax - scaleMin) + scaleMin) / multiplier;
}

getRandom(1, 150, 1);
