import {descriptions, messages, names, surnames} from './data';

import {getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './generate-random';

const generateCommentId = createRandomIdFromRangeGenerator(1, 1000);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`
});

const generatePhotoDescriptionId = createRandomIdFromRangeGenerator(1, 25);

const createPhotoDescription = () => ({
  id: generatePhotoDescriptionId(),
  url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(0, 30)}, createComment)
});

const photoDescriptions = Array.from({length: 25}, createPhotoDescription);

export {photoDescriptions};
