import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showErrorMessage } from './utils.js';
import './form.js';
import './effect.js';
import './scale.js';

const bootstrap = () => {
  getData()
    .then((data) => {
      renderGallery(data);
    }).catch (() => {
      showErrorMessage();
    });
};

bootstrap();

