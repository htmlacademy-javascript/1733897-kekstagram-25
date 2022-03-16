import {createPhoto} from './data.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotos = createPhoto();

const documentFragment = document.createDocumentFragment();

createPhotos.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').textContent = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;

  documentFragment.appendChild(pictureElement);
});


picturesContainer.appendChild(documentFragment);


