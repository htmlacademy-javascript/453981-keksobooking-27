export const getOffers = (onSuccess, onError) => fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then(onSuccess)
  .catch(onError);

export const createOffer = (offerData, onSuccess, onError) => fetch('https://27.javascript.pages.academy/keksobooking', {
  method: 'post',
  body: offerData,
})
  .then((response) => {
    if (response.ok) {
      onSuccess();

      return;
    }

    onError();
  })
  .catch(onError);
