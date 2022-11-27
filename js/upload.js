const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;

const avatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photo = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const checkFileType = (file) => ALLOWED_FILE_TYPES.some((type) => file.endsWith(type));

avatar.addEventListener('change', () => {
  const userAvatar = avatar.files[0];

  if (checkFileType(userAvatar.name.toLowerCase())) {
    avatarPreview.src = URL.createObjectURL(userAvatar);
  }
});

photo.addEventListener('change', () => {
  const file = photo.files[0];

  if (checkFileType(file.name.toLowerCase())) {
    photoPreview.innerHTML = '';
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.width = IMAGE_WIDTH;
    image.height = IMAGE_HEIGHT;
    photoPreview.append(image);
  }
});

export const resetPreviews = () => {
  avatarPreview.src = DEFAULT_AVATAR_URL;
  photoPreview.innerHTML = '';
};
