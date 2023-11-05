import {renderThumbnailsFragment} from './thumbnail.js';
import {openBigPictureModal, getThumbnailObject} from './big-picture.js';

const picturesElement = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  picturesElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const thumbnailId = evt.target.closest('[data-thumbnail-id]').dataset.thumbnailId;
    if (thumbnailId){
      const thumbnail = getThumbnailObject(thumbnailId);
      openBigPictureModal(thumbnail);
    }
  });

  renderThumbnailsFragment(pictures, picturesElement);
};

export {renderGallery};
