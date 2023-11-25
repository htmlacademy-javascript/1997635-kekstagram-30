import { initEffect, resetEffect } from './effect.js';
import { resetScale } from './scale.js';
import { showErrorMessage, showSuccesMessage } from './messages.js';
import { sendData } from './api.js';

const REGEXP_HASHTAG = /^#[a-zaа-яё1-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const ErrorText = {
  INVALID_COUNT: `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  INVALID_HASHTAG: 'Неправильный хэш-тег',
  NOT_UNIQUE: 'Один и тот же хэш-тег не может быть использован дважды'
};
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const loadInputElement = formElement.querySelector('.img-upload__input');
const overlayElement = formElement.querySelector('.img-upload__overlay');
const closeFormBtnElement = formElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const commentInputElement = formElement.querySelector('.text__description');
const submitFormElement = formElement.querySelector('.img-upload__submit');
const photoPreview = formElement.querySelector('.img-upload__preview img');
const effectsPreviews = formElement.querySelectorAll('.effects__preview');


const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
};

const pristine = new Pristine(formElement, defaultConfig, true);

const normalizeHashtags = () => hashtagsInputElement.value.trim().split(' ').filter((tag) => Boolean(tag));

const validationHashtagsText = (value) => normalizeHashtags(value).every((tag) => REGEXP_HASHTAG.test(tag));

const validationHashtagsCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const validationHashtagsUnique = (value) => {
  const lowerTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerTags.length === new Set(lowerTags).size;
};

const openForm = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  formElement.reset();
  pristine.reset();
  resetEffect();
  resetScale();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isInputFocused = () => {
  const focusedElement = document.activeElement;
  return focusedElement === hashtagsInputElement || focusedElement === commentInputElement;
};

function onDocumentKeydown (evt) {
  const isErrorMessageExists = Boolean(document.querySelector('.error'));
  if(evt.key === 'Escape' && !isInputFocused && !isErrorMessageExists) {
    evt.preventDefault();
    closeForm();
  }
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = () => {
  const file = loadInputElement.files[0];
  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((el) => {
      el.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    submitFormElement.disabled = true;
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        closeForm();
        showSuccesMessage();
      }).catch(() => {
        showErrorMessage();
      }).finally(() => {
        submitFormElement.disabled = false;
      });
  }
};

const onLoadInputChange = () => {
  openForm();
};

const onCloseFormBtnClick = () => {
  closeForm();
};

pristine.addValidator(
  hashtagsInputElement,
  validationHashtagsCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  hashtagsInputElement,
  validationHashtagsText,
  ErrorText.INVALID_HASHTAG,
  1,
  true
);

pristine.addValidator(
  hashtagsInputElement,
  validationHashtagsUnique,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

formElement.addEventListener('submit', onFormSubmit);
loadInputElement.addEventListener('change', onLoadInputChange);
closeFormBtnElement.addEventListener('click', onCloseFormBtnClick);
loadInputElement.addEventListener('change', onFileInputChange);
initEffect();
