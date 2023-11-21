const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallerBtnElement = modalElement.querySelector('.scale__control--smaller');
const biggerBtnElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmalleerBtnClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInputElement.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerBtnClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInputElement.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerBtnElement.addEventListener('click', onSmalleerBtnClick);
biggerBtnElement.addEventListener('click', onBiggerBtnClick);

export { resetScale };
