import { getPhotoDescriptions } from './utils.js';

const bigPictureModalElement = document.querySelector('.big-picture');
const closeBtnElement = bigPictureModalElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentsListElement = bigPictureModalElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');

const getThumbnailObject = (thumbnailId) => getPhotoDescriptions.find(({id}) => id === +thumbnailId);

const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = [...message].join(' ');
  return comment;
};

const renderCommentsFragment = (arr) => {
  const commentsFragment = document.createDocumentFragment();
  commentsListElement.innerHTML = '';
  arr.forEach((el) => {
    const comment = createComment(el);
    commentsFragment.append(comment);
  });
  commentsListElement.append(commentsFragment);
};

const createBigPicture = ({url, likes, comments, description}) => {
  bigPictureModalElement.querySelector('.big-picture__img img').src = url;
  bigPictureModalElement.querySelector('.big-picture__img img').alt = description;
  bigPictureModalElement.querySelector('.big-picture__social .social__header .social__caption').textContent = description;
  bigPictureModalElement.querySelector('.big-picture__social .social__header .social__likes span').textContent = likes;
  bigPictureModalElement.querySelector('.social__comment-count .social__comment-shown-count').textContent = comments.length;
  bigPictureModalElement.querySelector('.social__comment-count .social__comment-total-count').textContent = comments.length;
  renderCommentsFragment(comments);
};

const closeBigPictureModal = () => {
  bigPictureModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if(evt.key === 'Escape') {
    closeBigPictureModal();
  }
}

const openBigPictureModal = (thumbnail) => {
  bigPictureModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  createBigPicture(thumbnail);

  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureModalElement.querySelector('.comments-loader').classList.add('hidden');
  bigPictureModalElement.querySelector('.social__comment-count').classList.add('hidden');
};

closeBtnElement.addEventListener('click', () => {
  closeBigPictureModal();
});

export {openBigPictureModal, getThumbnailObject};
