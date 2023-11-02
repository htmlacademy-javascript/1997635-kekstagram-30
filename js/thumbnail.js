import {getPhotoDescriptions} from './utils';

const thumbnailTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');

const thumbnailsFragment = document.createDocumentFragment();

getPhotoDescriptions.forEach(({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsFragment.appendChild(thumbnail);
});

pictures.appendChild(thumbnailsFragment);
