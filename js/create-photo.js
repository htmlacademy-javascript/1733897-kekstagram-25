import {getRandomPositiveInteger} from './util.js';

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


const photoId = [];

const generateUniqueIdPhoto = () => {
  let newIdPhoto = getRandomPositiveInteger (1, 25);
  while (photoId.includes(newIdPhoto)) {
    newIdPhoto = getRandomPositiveInteger (1, 25);
  }
  photoId.push(newIdPhoto);
  return newIdPhoto;
};

const photoIdComment = [];

const generateUniqueIdComment = () => {
  let newIdComment = getRandomPositiveInteger (1, 999);
  while (photoIdComment.includes(newIdComment)) {
    newIdComment = getRandomPositiveInteger (1, 999);
  }
  photoIdComment.push(newIdComment);
  return newIdComment;
};


const createPhoto = () => {
  const randomId = generateUniqueIdPhoto();
  const randomLikes = getRandomPositiveInteger(15, 200);
  const randomIdComments = generateUniqueIdComment();
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
        avatar: `img/avatar-${  randomAvatar  }.svg`,
        message: MESSAGE[randomMessageIndex],
        name: NAMES[randomNameIndex]
      },

    ]
  };

};

const phottos = [];

for (let i = 0; i < 25; i++) {
  phottos[i] = createPhoto();
}

export {createPhoto};
