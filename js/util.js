function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength ('Какая-то строка', 140);

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}


export {checkStringLength, isEscapeKey};
