export function getOffers(onSuccess, onError) {
  return fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then(onSuccess)
    .catch(onError);
}

export function createOffer(offerData, onSuccess, onError) {
  return fetch('https://27.javascript.pages.academy/keksobooking', {
    method: 'post',
    body: offerData,
  })
    .then(onSuccess)
    .catch(onError);
}
