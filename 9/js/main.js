import {renderPhoto, showsFiltersPhotos, showsTenRandomPhoto, showsDiscussedPhoto} from './thumbnails.js';
import {setUserFormSubmit} from './user-form.js';
import {showsSuccessMessage} from './upload-message.js';
import {getData} from './api.js';
import './scale.js';


getData ((photos) => {
  renderPhoto(photos);
  showsTenRandomPhoto(photos);
  showsDiscussedPhoto(photos);
});

setUserFormSubmit(showsSuccessMessage);
showsFiltersPhotos();

