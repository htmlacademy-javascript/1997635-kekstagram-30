const BtnClasses = {
  ERROR: '.error__button',
  SUCCESS: '.success__button'
};

const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

const onCloseBtnClick = () => {
  hideMessage();
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showMessage = (element, btnClass) => {
  document.body.append(element);
  element.querySelector(btnClass).addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

const showSuccesMessage = () => {
  showMessage(successElement, BtnClasses.SUCCESS);
};

const showErrorMessage = () => {
  showMessage(errorElement, BtnClasses.ERROR);
};

export { showErrorMessage, showSuccesMessage };
