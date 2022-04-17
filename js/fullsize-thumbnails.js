import { isEscapeKey } from './util.js';

const picturesContainerElement = document.querySelector('.pictures');
const bodyTagElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = document.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//const randomPhotoCollection = picturesContainerElement.querySelectorAll('.picture__img');


const fullSizePhoto = () => {
  bigPictureImgElement.src = picturesContainerElement.querySelector('.picture__img').url;

};

const onRandomPhotoChange = () => {
  openBigPicture();
  //fullSizePhoto();
  //bigPictureImgElement.src = serverPhotos.url;
  //likesCountElement.textContent =
  //commentsCountElement.textContent =
};

picturesContainerElement.addEventListener ('click', onRandomPhotoChange);

bigPictureCancelElement.addEventListener('click', closeBigPicture);

function openBigPicture () {
  bigPictureElement.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
}

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
}
