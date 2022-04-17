import {renderPhoto, showsFiltersPhotos} from './thumbnails.js';
import {setUserFormSubmit} from './user-form.js';
import {showsSuccessMessage} from './upload-message.js';
import {getData} from './api.js';
import './scale.js';
import './fullsize-thumbnails.js';


getData ((photos) => {
  renderPhoto(photos);
});

setUserFormSubmit(showsSuccessMessage);
showsFiltersPhotos();

