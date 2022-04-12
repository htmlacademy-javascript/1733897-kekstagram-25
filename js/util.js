function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength ('Какая-то строка', 140);

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {checkStringLength, isEscapeKey, debounce};
