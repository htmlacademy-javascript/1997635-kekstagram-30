/**
 * Функция для проверки длины строки.
 * @param {string} str - Строка, которую нужно проверить
 * @param {number} maxLength - Максимальная длина строки
 * @returns {boolean} Возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.
 */
const checkStringLength = (str, maxLength) => str.length <= maxLength;


// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

/**
 * Функция для проверки, является ли строка палиндромом.
 * @param {string} str - Слово или фраза, которую нужно проверить
 * @returns {boolean} Возвращает true, если строка является палиндромом, и false, если строка не является палиндромом.
 */
const isPalindrome = (str) => {
  const str1 = str.toLowerCase().replaceAll(' ', '');
  let str2 = '';
  for (let i = str1.length - 1; i >= 0; i--) {
    str2 += str1[i];
  }
  return str1 === str2;
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
 */
const makePositiveInteger = (str) => {
  str = str.toString();
  let numberStr = '';
  for (const symbol of str) {
    if (!isNaN(parseInt(symbol, 10))){
      numberStr += symbol;
    }
  }
  return parseInt(numberStr, 10);
};

makePositiveInteger('2023 год'); // 2023
makePositiveInteger('ECMAScript 2022'); // 2022
makePositiveInteger('1 кефир, 0.5 батона'); // 105
makePositiveInteger('агент 007'); // 7
makePositiveInteger('а я томат'); // NaN
makePositiveInteger(2023); // 2023
makePositiveInteger(-1); // 1
makePositiveInteger(1.5); // 15

/**
 * Функция дополнения строк
 * @param {string} str - Строка, которую нужно проверить
 * @param {number} minLength - Минимальная длина строки
 * @param {string} additionalEl - Добавочные символы
 * @returns {string} Возвращает исходную строку, дополненную указанными символами до заданной длины
 */
const changeStr = (str, minLength, additionalEl) => {
  if (minLength <= str.length) {
    return str;
  } else {
    let result = str;
    result = additionalEl.slice(0, minLength - result.length) + result;
    return changeStr(result, minLength, additionalEl);
  }
};

/*if (minLength <= str.length) {
  return str;
} else {
  let result = str;
  while (minLength > result.length) {
    if ((additionalEl.length + result.length) <= minLength) {
      result = additionalEl + result;
    } else {
      const symbolsAdd = minLength - result.length;
      result = additionalEl.slice(0, symbolsAdd) + result;
      break;
    }
  }
  return result;
}*/

// return str.padStart(minLength, additionalEl);

changeStr('1', 2, '0'); //'01'
//console.log(changeStr('1', 4, '0')); //'0001'
//console.log(changeStr('q', 4, 'werty')); //'werq'
//console.log(changeStr('q', 4, 'we')); //'wweq'
//console.log(changeStr('qwerty', 4, '0')); //'qwerty'

const getTime = (time) => {
  if(String(time).includes(':', 0)) {
    const timeArr = time.split(':');
    return new Date().setHours(+timeArr[0], +timeArr[1], 0, 0);
  } else {
    return new Date().setHours(0, +time, 0, 0) - new Date().setHours(0, 0, 0, 0);
  }
};

/**
 * Функция определения выхода за рамки рабочего времени
 * @param {string} startWorkTime - Строка, в которой содержится время начала рабочего дня в формате 08:05, 8:5, 08:5 или 8:05
 * @param {string} endWorkTime - Строка, в которой содержится время конца рабочего дня
 * @param {string} startMeetingTime - Время старта встречи
 * @param {number} meetingDuration - Продолжительность встречи в минутах
 * @returns {boolean} Возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит
 */
const checkWorkingTimeLimits = (startWorkTime, endWorkTime, startMeetingTime, meetingDuration) => {
  const startWorkTimeDate = getTime(startWorkTime);
  const endWorkTimeDate = getTime(endWorkTime);
  const startMeetingTimeDate = getTime(startMeetingTime);
  const meetingDurationTime = getTime(meetingDuration);
  return (startWorkTimeDate <= startMeetingTimeDate && (startMeetingTimeDate + meetingDurationTime) <= endWorkTimeDate);
};

checkWorkingTimeLimits('08:00', '17:30', '14:00', 90); // true
//console.log(checkWorkingTimeLimits('8:0', '10:0', '8:0', 120)); // true
//console.log(checkWorkingTimeLimits('08:00', '14:30', '14:00', 90)); // false
//console.log(checkWorkingTimeLimits('14:00', '17:30', '08:0', 90)); // false
//console.log(checkWorkingTimeLimits('8:00', '17:30', '08:00', 900)); // false
