import {renderPhoto} from './thumbnails.js';
import {setUserFormSubmit} from './user-form.js';
import {showsSuccessMessage} from './upload-message.js';
import './scale.js';

//import './fetch.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhoto(photos);
  })
  .catch();

setUserFormSubmit(showsSuccessMessage);
