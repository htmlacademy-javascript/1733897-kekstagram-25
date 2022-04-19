import {serverPhotos} from './api.js';
import {debounce} from './util.js';
import {onRandomPhotoChange} from './fullsize-thumbnails.js';
const renderDelay = 500;

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFiltersElement = document.querySelector('.img-filters');
const filterDefoultElement = imgFiltersElement.querySelector('#filter-default');
const filterRandomElement = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedElement = imgFiltersElement.querySelector('#filter-discussed');

const renderPhoto = (createPhotos) => {
  const documentFragment = document.createDocumentFragment();

  createPhotos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    documentFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => onRandomPhotoChange(photo));
  });

  picturesContainerElement.appendChild(documentFragment);
};

// Показывает фильтры после загрузки и отрисовки фотографий

const showsFiltersPhotos = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');
};

// Функция убирает отрисованные ранее фотографии пользователей

const clearPicturesContainer = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

// Функция показывает 10 рандомных фотографий

const showsTenRandomPhoto = debounce((photos) => {
  const shuffled = photos.slice().sort(() => 0.5 - Math.random());
  const random = shuffled.slice(0, 10);
  return renderPhoto(random);}, renderDelay);

// Функция показывает самые обсуждаемые фото

const showsDiscussedPhoto = debounce((photos) => {
  const discussed = photos.slice().sort((a, b) => (a.comments.length < b.comments.length) ? 1 : -1);
  renderPhoto(discussed);}, renderDelay);

// Обработчики кнопок фильтра
// Случайные
filterRandomElement.addEventListener('click', () => {
  filterRandomElement.classList.add('img-filters__button--active');
  filterDefoultElement.classList.remove('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');
  clearPicturesContainer();
  showsTenRandomPhoto(serverPhotos);
});
// Обсуждаемые
filterDiscussedElement.addEventListener('click', () => {
  filterRandomElement.classList.remove('img-filters__button--active');
  filterDefoultElement.classList.remove('img-filters__button--active');
  filterDiscussedElement.classList.add('img-filters__button--active');
  clearPicturesContainer();
  showsDiscussedPhoto(serverPhotos);
});
// По умолчанию
filterDefoultElement.addEventListener('click', () => {
  filterRandomElement.classList.remove('img-filters__button--active');
  filterDefoultElement.classList.add('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');
  clearPicturesContainer();
  renderPhoto(serverPhotos);
});


export{renderPhoto, showsFiltersPhotos, showsTenRandomPhoto, showsDiscussedPhoto, clearPicturesContainer};
