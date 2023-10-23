import {descriptions, messages, names, surnames} from './data';

import {getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './generate-random';

const createComment = () => ({
  id: createRandomIdFromRangeGenerator(1, 1000)(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`
});

const createPhotoDescription = () => ({
  id: createRandomIdFromRangeGenerator(1, 25)(),
  url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(0, 30)}, createComment)
});

const photoDescriptions = Array.from({length: 25}, createPhotoDescription);

export {photoDescriptions};
