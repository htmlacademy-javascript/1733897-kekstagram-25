import {closeUpload} from './user-form.js';
import {closeBigPicture} from './fullsize-thumbnails.js';

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength ('Какая-то строка', 140);

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUpload();
    closeBigPicture();
  }
};

export {checkStringLength, isEscapeKey, debounce, onUploadEscKeydown};
