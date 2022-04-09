import {renderPhoto} from './thumbnails.js';
import {setUserFormSubmit} from './user-form.js';
import {showsSuccessMessage} from './upload-message.js';
import {getData} from './api.js';
import './scale.js';


getData ((photos) => {
  renderPhoto(photos);
});

setUserFormSubmit(showsSuccessMessage);
