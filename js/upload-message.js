import { isEscapeKey } from './util.js';
import {closeUpload} from './user-form.js';

const bodyTagElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');

// Шаблоны сообщений об отправке

const onSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const onErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadMessageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
const documentFragment = document.createDocumentFragment();


const deleteMessage = () => {
  documentFragment.remove();
  bodyTagElement.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    deleteMessage();
  }
};

// Функции сообщений об отправке

const showsSuccessMessage = () => {

  const messageOnSuccess = onSuccessTemplate.cloneNode(true);
  documentFragment.appendChild(messageOnSuccess);
  bodyTagElement.appendChild(documentFragment);
  bodyTagElement.classList.add('modal-open');
  formElement.reset();
  closeUpload();

  const successButton = onSuccessTemplate.querySelector('.success__button');
  successButton.addEventListener('click', deleteMessage);

  document.addEventListener('keydown', onEscKeydown);

  document.addEventListener('click', (evt) => {
    if (!messageOnSuccess.contains(evt.target)) {
      messageOnSuccess.style.display = 'none';
    }
  });
};

const showsErrorMessage = () => {

  const messageOnError = onErrorTemplate.cloneNode(true);
  documentFragment.appendChild(messageOnError);
  bodyTagElement.appendChild(documentFragment);
  bodyTagElement.classList.add('modal-open');
};

const showsUploadMessage = () => {

  const messageLoading = uploadMessageTemplate.cloneNode(true);
  documentFragment.appendChild(messageLoading);
  bodyTagElement.appendChild(documentFragment);
  bodyTagElement.classList.add('modal-open');
};

export {showsSuccessMessage, showsErrorMessage, showsUploadMessage};
