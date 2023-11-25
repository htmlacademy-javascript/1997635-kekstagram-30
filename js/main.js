import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { showErrorMessage } from './utils.js';
import { initFilters } from './filters.js';
import './form.js';

const bootstrap = () => {
  getData()
    .then((data) => {
      renderGallery(data);
      initFilters(data);
    }).catch (() => {
      showErrorMessage();
    });
};

bootstrap();

