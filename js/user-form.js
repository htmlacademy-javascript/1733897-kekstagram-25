import { isEscapeKey, stringLength } from './util.js';


const form = document.querySelector('.img-upload__form');
const openForm = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview').querySelector('img');
const uploadPhoto = document.querySelector('.img-upload__overlay');
const bodyTag = document.querySelector('body');
const comment = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');
const hashtagValidate = /^#[A-Za-zA-Яа-яËё0-9]{1,19}$/;
const MAXLENGTH_HASHTAGS_SYMBOLS = 20;
const HASGTAGS_COUNTS = 5;

const pristine = new Pristine(form, {
  classTo:'text__hashtags',
  errorTextParent: 'text__hashtags',
  errorTextClass: 'text__hashtags',
});
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
    hashtag.style.background = '';
  } else {
    console.log('Форма невалидна');
    hashtag.style.background = 'pink';
  }
});

const checkLength = (value, maxLength) => value.length <= maxLength;

const checkMinLength = (string) => string.split(' ').filter((item) => item !== '').every((item) => item.length >= 2);

const checkMaxLength = (string) => string.split(' ').filter((item) => item !== '').every((item) => checkLength(item, MAXLENGTH_HASHTAGS_SYMBOLS));

const checkHashtag = (string) => string.split(' ').filter((item) => item !== '').every((item) => item[0] === '#');

const checkSymbols = (string) => string.split(' ').filter((item) => item !== '').every((item) => {
  if (item.length > 1) {
    return hashtagValidate.test(item);
  }
  return true;
});

const checkUniq = (string) => {
  const hashtags = string.split(' ').filter((item) => item !== '');
  const allUnique = !hashtags.some((item, index) => hashtags.indexOf(item) < index);
  return allUnique;
};

const checkCount = (string) => {
  const hashtags = string.split(' ').filter((item) => item !== '');
  if (hashtags.length > HASGTAGS_COUNTS) {
    return false;
  }
  return true;
};

pristine.addValidator(hashtag, checkMinLength, 'hashtag length min 2 symbols');
pristine.addValidator(hashtag, checkMaxLength, 'hashtag length max 20 symbols');
pristine.addValidator(hashtag, checkHashtag, 'begin with #');
pristine.addValidator(hashtag, checkSymbols, 'wrong symbol');
pristine.addValidator(hashtag, checkUniq, 'this hashtag already exist');
pristine.addValidator(hashtag, checkCount, 'max 5 hashtags');


const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUpload();
  }
};


function openUpload (evt) {
  preview.src = URL.createObjectURL(evt.target.files[0]);
  uploadPhoto.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
}

function closeUpload () {
  uploadPhoto.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
  openForm.value = '';
  document.removeEventListener('keydown', onUploadEscKeydown);
}

const onFocus = () => {
  comment.addEventListener('focus', () => {
    document.removeEventListener('keydown', onUploadEscKeydown);
  });
  hashtag.addEventListener('focus', () => {
    document.removeEventListener('keydown', onUploadEscKeydown);
  });
};


const initializeForm = () => {
  const closeForm = document.querySelector('#upload-cancel');
  openForm.addEventListener('change', openUpload);
  closeForm.addEventListener('click', closeUpload);
  onFocus();
};

initializeForm();
