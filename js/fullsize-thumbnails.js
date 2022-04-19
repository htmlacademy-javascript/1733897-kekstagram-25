import { onUploadEscKeydown } from './util.js';

const bodyTagElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = document.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsListElement = bigPictureElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsCount = socialCommentCount.querySelector('span');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
};

const onRandomPhotoChange = (photo) => {

  bigPictureElement.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);

  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  socialCaptionElement.textContent = photo.description;
  commentsCountElement.textContent = photo.comments.length;

  socialCommentsListElement.innerHTML = '';
  const documentFragment = document.createDocumentFragment();


  photo.comments.slice(0,5).forEach((comment) => {
    const listElement = commentTemplate.cloneNode(true);
    listElement.querySelector('.social__picture').src = comment.avatar;
    listElement.querySelector('.social__picture').alt = comment.name;
    listElement.querySelector('.social__text').textContent = comment.message;
    documentFragment.appendChild(listElement);
  });
  socialCommentsListElement.appendChild(documentFragment);


  if (photo.comments.length < 5) {
    socialCommentCount.textContent = `${photo.comments.length  } из ${  photo.comments.length  } комментариев`;
  } else {
    commentsCount.textContent = photo.comments.length;
  }
};

bigPictureCancelElement.addEventListener('click', closeBigPicture);


export {onRandomPhotoChange, closeBigPicture};
