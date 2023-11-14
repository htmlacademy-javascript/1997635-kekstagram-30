import {DESCRIPTIONS, MESSAGES, NAMES, SURNAMES} from './data';

import {getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './generate-random';

const generateCommentId = createRandomIdFromRangeGenerator(1, 1000);

const getMessages = (arr) => {
  const messagesArr = new Set();
  const quantity = getRandomPositiveInteger(1, 2);
  while (messagesArr.size < quantity) {
    messagesArr.add(getRandomArrayElement(arr));
  }
  return messagesArr;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getMessages(MESSAGES),
  name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`
});

const generatePhotoDescriptionId = createRandomIdFromRangeGenerator(1, 25);

const createPhotoDescription = () => ({
  id: generatePhotoDescriptionId(),
  url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(0, 30)}, createComment)
});

const getPhotoDescriptions = Array.from({length: 25}, createPhotoDescription);

export {getPhotoDescriptions};
