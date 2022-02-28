// Взял функцию со своего прошлого проекта

function getRandomPositiveInteger (min, max) {

  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

getRandomPositiveInteger ();


function stringLength (string, maxLength) {
  return string.length <= maxLength;
}

stringLength ('Какая-то строка', 140);

const NAMES = [
  'Иван',
  'Мария',
  'Александр',
  'Виктор',
  'Юлия',
  'Артем',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

const creatPhoto = () => {
  const randomId = getRandomPositiveInteger(1, 25);
  const randomLikes = getRandomPositiveInteger(15, 200);
  const randomIdComments = getRandomPositiveInteger(1, 999);
  const randomAvatar = getRandomPositiveInteger(1, 6);
  const randomMessageIndex = getRandomPositiveInteger(0, MESSAGE.length - 1);
  const randomNameIndex = getRandomPositiveInteger(0, NAMES.length - 1);

  return {
    id: randomId,
    url: `photos/${  randomId  }.jpg`,
    description: '',
    lakes: randomLikes,
    comments: [
      {
        id: randomIdComments,
        // eslint-disable-next-line no-useless-concat
        avatar: 'img/avatar' + `-${  randomAvatar  }.svg`,
        message: MESSAGE[randomMessageIndex],
        name: NAMES[randomNameIndex]
      },

    ]
  };

};

creatPhoto();
