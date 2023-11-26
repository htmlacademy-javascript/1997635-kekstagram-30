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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

export { showErrorMessage, debounce, getRandomArrayElement };
