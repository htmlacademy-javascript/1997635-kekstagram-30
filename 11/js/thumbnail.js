const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.dataset.thumbnailId = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const renderThumbnailsFragment = (arr, container) => {
  const thumbnailsFragment = document.createDocumentFragment();
  arr.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailsFragment.append(thumbnail);
  });
  container.append(thumbnailsFragment);
};

export { renderThumbnailsFragment };
