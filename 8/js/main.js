import {renderPhoto} from './thumbnails.js';
import './user-form.js';
import './scale.js';

//import './fetch.js';

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhoto(photos);
  })
  .catch();


