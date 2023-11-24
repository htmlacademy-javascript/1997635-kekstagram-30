import { debounce, getRandomArrayElement } from './utils.js';
import { renderGallery } from './gallery.js';

const COUNT_RANDOM_FHOTO = 10;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const defaultBtnFilter = filtersFormElement.querySelector('#filter-default');
const randomBtnFilter = filtersFormElement.querySelector('#filter-random');
const discussedBtnFilter = filtersFormElement.querySelector('#filter-discussed');

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomFhotos = new Set();
    while ((data.length > COUNT_RANDOM_FHOTO) ?
      (randomFhotos.size < COUNT_RANDOM_FHOTO) :
      (randomFhotos.size < data.length)) {
      randomFhotos.add(getRandomArrayElement(data));
    }
    return Array.from(randomFhotos);
  },
  [FilterEnum.DISCUSSED]: (data) => data.slice().sort((a, b) => b.comments.length - a.comments.length)
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (evt, filter, data) => {
  if(currentFilter !== filter) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filteredData);
    const currentActiveEl = filtersFormElement.querySelector('.img-filters__button--active');
    currentActiveEl.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = filter;
  }
};

const debouncedRepain = debounce(repaint);

const initFilters = (data) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultBtnFilter.addEventListener('click', (evt) => {
    debouncedRepain(evt, FilterEnum.DEFAULT, data);
  });
  randomBtnFilter.addEventListener('click', (evt) => {
    debouncedRepain(evt, FilterEnum.RANDOM, data);
  });
  discussedBtnFilter.addEventListener('click', (evt) => {
    debouncedRepain(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilters };
