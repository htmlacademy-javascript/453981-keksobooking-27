const ALLOWED_FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const avatar = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photo = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

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
    image.width = 70;
    image.height = 70;
    photoPreview.append(image);
  }
});

function checkFileType(file) {
  return ALLOWED_FILE_TYPES.some((type) => file.endsWith(type));
}

export function resetPreviews() {
  avatarPreview.src = DEFAULT_AVATAR_URL;
  photoPreview.innerHTML = '';
}
