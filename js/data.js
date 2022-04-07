import {getRandomPositiveInteger} from './util.js';

const NAMES = [
  'Иван',
  'Мария',
  'Александр',
  'Виктор',
  'Юлия',
  'Артем',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];


const photoIds = [];

const generateUniqueIdPhoto = () => {
  let newIdPhoto = getRandomPositiveInteger (1, 25);
  while (photoIds.includes(newIdPhoto)) {
    newIdPhoto = getRandomPositiveInteger (1, 25);
  }
  photoIds.push(newIdPhoto);
  return newIdPhoto;
};

const photoIdComments = [];

const generateUniqueIdComment = () => {
  let newIdComment = getRandomPositiveInteger (1, 999);
  while (photoIdComments.includes(newIdComment)) {
    newIdComment = getRandomPositiveInteger (1, 999);
  }
  photoIdComments.push(newIdComment);
  return newIdComment;
};


const createPhoto = () => {
  const randomId = generateUniqueIdPhoto();
  const randomLikes = getRandomPositiveInteger(15, 200);
  const randomIdComments = generateUniqueIdComment();
  const randomAvatar = getRandomPositiveInteger(1, 6);
  const randomMessageIndex = getRandomPositiveInteger(0, MESSAGES.length - 1);
  const randomNameIndex = getRandomPositiveInteger(0, NAMES.length - 1);

  return {
    id: randomId,
    url: `photos/${  randomId  }.jpg`,
    description: '',
    likes: randomLikes,
    comments: [
      {
        id: randomIdComments,
        avatar: `img/avatar-${  randomAvatar  }.svg`,
        message: MESSAGES[randomMessageIndex],
        name: NAMES[randomNameIndex]
      },

    ]
  };

};

export {createPhoto};
