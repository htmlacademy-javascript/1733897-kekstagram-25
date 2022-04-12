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

const showsTenRandomPhoto = (photos) => {

  filterRandomElement.addEventListener('click', () => {
    filterRandomElement.classList.add('img-filters__button--active');
    filterDefoultElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.remove('img-filters__button--active');
  });
  //clearPicturesContainer();
  const random = photos.sort(() => .5 - Math.random()).slice(0,10);
  return random;
};

// Функция показывает самые обсуждаемые фото

const showsDiscussedPhoto = (photos) => {

  filterDiscussedElement.addEventListener('click', () => {
    filterRandomElement.classList.remove('img-filters__button--active');
    filterDefoultElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.add('img-filters__button--active');
  });
  //clearPicturesContainer();
  const discussed = photos.sort((a, b) => (a.color > b.color) ? 1 : -1);
  return discussed;
};

filterDefoultElement.addEventListener('click', () => {
  filterRandomElement.classList.remove('img-filters__button--active');
  filterDefoultElement.classList.add('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');
});


export{renderPhoto, showsFiltersPhotos, showsTenRandomPhoto, showsDiscussedPhoto, clearPicturesContainer};
