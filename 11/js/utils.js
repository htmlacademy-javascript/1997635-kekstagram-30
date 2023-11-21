const REMOVE_MESSAGE_TIMEOUT = 5000;

const errorTemplate = document.querySelector('#data-error').content;
const bodyElement = document.querySelector('body');

const showErrorMessage = () => {
  bodyElement.append(errorTemplate);
  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

export { showErrorMessage };
