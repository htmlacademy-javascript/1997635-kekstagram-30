import { getPhotoDescriptions } from './utils.js';

const COUNT_SHOW_COMMENTS = 5;

const bigPictureModalElement = document.querySelector('.big-picture');
const closeBtnElement = bigPictureModalElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentsListElement = bigPictureModalElement.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const loaderBtnElement = bigPictureModalElement.querySelector('.social__comments-loader');
const totalCommentCountElement = bigPictureModalElement.querySelector('.social__comment-count .social__comment-total-count');
const shownCommentCountElement = bigPictureModalElement.querySelector('.social__comment-count .social__comment-shown-count');

const createComment = ({avatar, message, name}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = [...message].join(' ');
  return comment;
};

let commentsCount = 0;
let socialComments = [];

const renderCommentsFragment = () => {
  commentsCount += COUNT_SHOW_COMMENTS;
  if (commentsCount >= socialComments.length){
    loaderBtnElement.classList.add('hidden');
    commentsCount = socialComments.length;
  } else {
    loaderBtnElement.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  commentsListElement.innerHTML = '';

  for(let i = 0; i < commentsCount; i++){
    const comment = createComment(socialComments[i]);
    commentsFragment.append(comment);
  }
  commentsListElement.append(commentsFragment);
  totalCommentCountElement.textContent = socialComments.length;
  shownCommentCountElement.textContent = commentsCount;
};

const onLoaderClick = () => {
  renderCommentsFragment();
};

const getThumbnailObject = (thumbnailId) => getPhotoDescriptions.find(({id}) => id === +thumbnailId);

const createBigPicture = ({url, likes, comments, description}) => {
  bigPictureModalElement.querySelector('.big-picture__img img').src = url;
  bigPictureModalElement.querySelector('.big-picture__img img').alt = description;
  bigPictureModalElement.querySelector('.big-picture__social .social__header .social__caption').textContent = description;
  bigPictureModalElement.querySelector('.big-picture__social .social__header .social__likes span').textContent = likes;
  socialComments = comments;
  renderCommentsFragment();
};

const closeBigPictureModal = () => {
  bigPictureModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsCount = 0;
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
};

closeBtnElement.addEventListener('click', () => {
  closeBigPictureModal();
});

loaderBtnElement.addEventListener('click', onLoaderClick);

export {openBigPictureModal, getThumbnailObject};
