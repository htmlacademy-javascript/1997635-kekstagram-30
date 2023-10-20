const descriptions = [
  'Прекрасный момент',
  'Незабываемый день',
  'Буду помнить об этих моментах',
  'Секунды счастья',
  'Выходные в кругу семьи',
  'Иметь мягкое сердце в жестоком мире — это сила, а не слабость',
  'Пятница — мое второе любимое слово',
  'У вас никогда не заканчиваются вещи, которые могут пойти не так',
  'Отдыхайте так, чтобы вы забывали брать телефон в руки',
  'Будьте счастливы. Это сводит людей с ума',
  'Будьте тем человеком, с которым вы хотите провести всю жизнь',
  'Моя жизнь не идеальна, но это лучшее, что когда-либо случалось со мной'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Михаил',
  'Александр',
  'Максим',
  'Марк',
  'Артем',
  'Лев',
  'Матвей',
  'Тимофей',
  'София',
  'Анна',
  'Мария',
  'Ева',
  'Виктория',
  'Полина',
  'Варвара',
  'Алиса',
  'Василиса'
];

const surnames = [
  'Ющенко',
  'Тимошенко',
  'Шнайдер',
  'Шуткевич',
  'Черных',
  'Сухих',
  'Чутких',
  'Долгих',
  'Бегун',
  'Мельник',
  'Соловей',
  'Дюма',
  'Ткаченко',
  'Франко',
  'Чуб',
  'Худик',
  'Трумпф'
];

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

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

/*const photoDescriptions = */Array.from({length: 25}, createPhotoDescription);

//console.log(photoDescriptions);
