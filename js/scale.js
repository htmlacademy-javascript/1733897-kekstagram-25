
const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlBiggerElement = document.querySelector('.scale__control--bigger');
const controlValueElement = document.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const imagePreview = document.querySelector('.img-upload__preview');
const innerImage = imagePreview.querySelector('img');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
let currentEffect = 'none';
const effectValueElement = document.querySelector('.effect-level__value');

const EFFECT_SIGN = {
  none: '',
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};
const EFFECT_STYLE = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};
const SLIDER_EFFECT_OPTIONS = {
  none: {},

  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  },

  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  },

  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100
  },

  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3
  },

  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3
  }
};

// Скрипт для изменения масштаба картинки

function changeControl() {
  controlSmallerElement.addEventListener('click', () => {
    let currentValue = parseInt(controlValueElement.value, 10);
    if (currentValue > 25 && currentValue <= 100) {
      currentValue -= SCALE_STEP;
      controlValueElement.value = `${currentValue}%`;
      imagePreview.style.transform = `scale(${currentValue}%)`;}
  });
  controlBiggerElement.addEventListener('click', () => {
    let currentValue = parseInt(controlValueElement.value, 10);
    if (currentValue >= 25 && currentValue < 100) {
      currentValue += SCALE_STEP;
      controlValueElement.value = `${currentValue}%`;
      imagePreview.style.transform = `scale(${currentValue}%)`;}
  });
}

changeControl();

// Скрипт для наложения эффекта

function clearEffect() {
  sliderWrapperElement.classList.remove('active');
  innerImage.className = 'effects effects__preview--none';
  innerImage.style.filter = '';
}

function initRangeSlider() {
  const sliderElement = document.querySelector('.effect-level__slider');
  const imgEffectsElement = document.querySelector('.img-upload__effects');

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  });

  sliderElement.noUiSlider.on('update', () => {
    effectValueElement.value = sliderElement.noUiSlider.get();
    innerImage.style.filter = `${EFFECT_STYLE[currentEffect]}(${effectValueElement.value}${EFFECT_SIGN[currentEffect]})`;
  });

  imgEffectsElement.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    innerImage.className = `effects effects__preview--${currentEffect}`;
    sliderElement.noUiSlider.updateOptions(SLIDER_EFFECT_OPTIONS[currentEffect]);
    if (currentEffect === 'none') {
      clearEffect();
    } else {
      sliderWrapperElement.classList.add('active');
    }
  });
}

initRangeSlider();
