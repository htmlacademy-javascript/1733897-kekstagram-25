import { isEscapeKey, checkStringLength } from './util.js';
import {resetPhotoSettings} from './scale.js';


const formElement = document.querySelector('.img-upload__form');
const openFormElement = document.querySelector('#upload-file');
const previewElement = document.querySelector('.img-upload__preview').querySelector('img');
const uploadPhotoElement = document.querySelector('.img-upload__overlay');
const bodyTagElement = document.querySelector('body');
const commentsElement = document.querySelector('.text__description');
const hashtagElement = document.querySelector('.text__hashtags');
const hashtagValidate = /^#[A-Za-zA-Яа-яËё0-9]{1,19}$/;
const MAXLENGTH_HASHTAGS_SYMBOLS = 20;
const HASGTAGS_COUNTS = 5;

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text',
});


formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    hashtagElement.style.background = '';

    const formData = new FormData(evt.target);

    fetch ('https://25.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      }
    );
    hashtagElement.value = '';
    commentsElement. value = '';
    closeUpload();
  } else {
    hashtagElement.style.background = 'pink';
  }
});


function checkMinLength(string) {
  return string.split(' ').filter((item) => item !== '').every((item) => item.length >= 2);
}

function checkMaxLength(string) {
  return string.split(' ').filter((item) => item !== '').every((item) => checkStringLength (item, MAXLENGTH_HASHTAGS_SYMBOLS));
}

function checkHashtag(string) {
  return string.split(' ').filter((item) => item !== '').every((item) => item.startsWith('#'));
}

function checkSymbols(string) {
  return string.split(' ').filter((item) => item !== '').every((item) => {
    if (item.length > 1) {
      return hashtagValidate.test(item);
    }
    return true;
  });
}

function checkUnique(string) {
  const hashtags = string.split(' ').filter(Boolean);
  return hashtags.length === new Set(hashtags).size;
}

function checkCount(string) {
  const hashtags = string.split(' ').filter(Boolean);
  return hashtags.length <= HASGTAGS_COUNTS;
}

pristine.addValidator(hashtagElement, checkMinLength, 'hashtag length min 2 symbols');
pristine.addValidator(hashtagElement, checkMaxLength, 'hashtag length max 20 symbols');
pristine.addValidator(hashtagElement, checkHashtag, 'begin with #');
pristine.addValidator(hashtagElement, checkSymbols, 'wrong symbol');
pristine.addValidator(hashtagElement, checkUnique, 'this hashtag already exist');
pristine.addValidator(hashtagElement, checkCount, 'max 5 hashtags');


const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUpload();
  }
};


function openUpload (evt) {
  previewElement.src = URL.createObjectURL(evt.target.files[0]);
  uploadPhotoElement.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
}

function closeUpload () {
  uploadPhotoElement.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  openFormElement.value = '';
  document.removeEventListener('keydown', onUploadEscKeydown);
  resetPhotoSettings();
}

const onFocus = () => {
  commentsElement.addEventListener('focus', () => {
    document.removeEventListener('keydown', onUploadEscKeydown);
  });
  hashtagElement.addEventListener('focus', () => {
    document.removeEventListener('keydown', onUploadEscKeydown);
  });
};


const initializeForm = () => {
  const closeFormElement = document.querySelector('#upload-cancel');
  openFormElement.addEventListener('change', openUpload);
  closeFormElement.addEventListener('click', closeUpload);
  onFocus();
};

initializeForm();


