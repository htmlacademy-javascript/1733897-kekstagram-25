// Взял функцию со своего прошлого проекта

function getRandomPositiveInteger (min, max) {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

getRandomPositiveInteger ();


function stringLength (string, maxLength) {
  return string <= maxLength;
}

stringLength ();
