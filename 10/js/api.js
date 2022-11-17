export function getOffers() {
  return fetch('https://27.javascript.pages.academy/keksobooking/data', {
    method: 'get',
  });
}

export function createOffer(offerData) {
  return fetch('https://27.javascript.pages.academy/keksobooking', {
    method: 'post',
    body: offerData,
  });
}
