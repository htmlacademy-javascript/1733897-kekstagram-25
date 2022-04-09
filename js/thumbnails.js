//import {createPhoto} from './data.js';

//const PHOTOS = 25;

const picturesContainerElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//const documentFragment = document.createDocumentFragment();

//const createPhotos = [];

/*for (let i = 0; i < PHOTOS; i++) {
  createPhotos[i] = createPhoto();
}

  createPhotos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    documentFragment.appendChild(pictureElement);
  });


  picturesContainerElement.appendChild(documentFragment);


*/

const renderPhoto = (createPhotos) => {
  const documentFragment = document.createDocumentFragment();

  createPhotos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    documentFragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(documentFragment);
};

export{renderPhoto};
