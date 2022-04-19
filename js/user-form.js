import { checkStringLength, onUploadEscKeydown } from './util.js';
import {resetPhotoSettings} from './scale.js';
import {showsErrorMessage} from './upload-message.js';
import {sendData} from './api.js';


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

// Привинчиваем Pristine

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text',
});

// Обработчик отправки фотографий

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      hashtagElement.style.background = '';

      const formData = new FormData(evt.target);
      sendData (
        () => onSuccess(),
        () => showsErrorMessage(),
        formData
      );
    } else {
      hashtagElement.style.background = 'pink';
    }
  });
};


const checkMinLength = (string) => string.split(' ').filter((item) => item !== '').every((item) => item.length >= 2);

const checkMaxLength = (string) => string.split(' ').filter((item) => item !== '').every((item) => checkStringLength (item, MAXLENGTH_HASHTAGS_SYMBOLS));

const checkHashtag = (string) => string.split(' ').filter((item) => item !== '').every((item) => item.startsWith('#'));

const checkSymbols = (string) => string.split(' ').filter((item) => item !== '').every((item) => {
  if (item.length > 1) {
    return hashtagValidate.test(item);
  }
  return true;
});

const checkUnique = (string) => {
  const hashtags = string.split(' ').filter(Boolean);
  return hashtags.length === new Set(hashtags).size;
};

const checkCount =(string) => {
  const hashtags = string.split(' ').filter(Boolean);
  return hashtags.length <= HASGTAGS_COUNTS;
};

pristine.addValidator(hashtagElement, checkMinLength, 'hashtag length min 2 symbols');
pristine.addValidator(hashtagElement, checkMaxLength, 'hashtag length max 20 symbols');
pristine.addValidator(hashtagElement, checkHashtag, 'begin with #');
pristine.addValidator(hashtagElement, checkSymbols, 'wrong symbol');
pristine.addValidator(hashtagElement, checkUnique, 'this hashtag already exist');
pristine.addValidator(hashtagElement, checkCount, 'max 5 hashtags');

const closeUpload = () => {
  uploadPhotoElement.classList.add('hidden');
  bodyTagElement.classList.remove('modal-open');
  openFormElement.value = '';
  document.removeEventListener('keydown', onUploadEscKeydown);
  resetPhotoSettings();
};

const openUpload = (evt) => {
  previewElement.src = URL.createObjectURL(evt.target.files[0]);
  uploadPhotoElement.classList.remove('hidden');
  bodyTagElement.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
};

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

export{setUserFormSubmit, closeUpload};
