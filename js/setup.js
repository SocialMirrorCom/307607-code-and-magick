'use strict';

// Находим и показываем, убрав класс hidden, блок setup

var setup = document.querySelector('.setup');

// Создаем массив, состоящий из 4 сгенерированных JS объектов

var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];


// Функция по получению случайного элемента массива

var getRandomData = function (arrey) {
  var randomIndex = Math.floor(Math.random() * arrey.length);
  var data = arrey[randomIndex];
  return data;
};

// Функция по созданию массива с объектами с случайными значениями свойств

var getHeroesArrey = function (heroesQuantity) {
  var heroes = [];
  for (var i = 0; i < heroesQuantity; i++) {
    heroes[i] = {
      name: getRandomData(names) + ' ' + getRandomData(surnames),
      coatColor: getRandomData(coatColors),
      eyesColor: getRandomData(eyesColors)
    };
  }
  return heroes;
};

// Находим и сохраняем в переменную список похожих персонажей

var similarListElement = setup.querySelector('.setup-similar-list');

// Находим шаблон и элемент, который мы будем клонировать и сохраняем в переменную

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Запускаем функцию по созданию массива

var wizards = getHeroesArrey(4);

// Функция по созданию одного элемента по шаблону

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Создаем фрагмент

var fragment = document.createDocumentFragment();

// Вставляем во фрагмент элементы

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// Вставляем фрагмент

similarListElement.appendChild(fragment);

// Показываем блок на сайте

setup.querySelector('.setup-similar').classList.remove('hidden');

// Открываем/закрываем окно редактирования персонажей

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');


// Функция обработчик по закрытию диалогового окна нажатием на клавишу esc

var onPopupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция открытия диалогового окна

var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия диалогового окна

var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Обработчик события клик для открытия диалогового окна

setupOpen.addEventListener('click', function() {
  openPopup();
});

// Обработчик события для открытия диалогового окна с помощью клавиши enter

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Проверяем в фокусе ли элемент или нет с помощью функции

var getElementFocused = function (element) {
  var inputFocused = false;
  element.addEventListener("focus", function() {
      inputFocused = true;
  });
  element.addEventListener("blur", function() {
      inputFocused = false;
  });
  return inputFocused;
};

// Закрываем диалоговое окно по клику на крестик, если Input в фокусе, диалоговое окно не закроется

setupClose.addEventListener('click', function() {
  if (getElementFocused(setupUserName)) {
  closePopup();
  }
});

// Закрываем диалоговое окно клавишей Enter, когда крестик находится в фокусе

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Кастомизируем события в случае некорректно введенных данных

setupUserName.addEventListener('invalid', function (evt) {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

// Без понятия что тут делаем и зачем, узнать

setupUserName.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// Меняем цвет плаща волшебника по клику

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardCoatInput = setup.querySelector('input[name=coat-color]');

wizardCoat.addEventListener('click', function () {
  var currentCoatColor = getRandomData(coatColors);
  wizardCoat.style.fill = currentCoatColor;
  wizardCoatInput.setAttribute('value', currentCoatColor);
});

// Меняем цвет глаз волшебника по клику

var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardEyesInput = setup.querySelector('input[name=eyes-color]');

wizardEyes.addEventListener('click', function () {
  var currentEyesColor = getRandomData(eyesColors);
  wizardEyes.style.fill = currentEyesColor;
  wizardEyesInput.setAttribute('value', currentEyesColor);
});

// Меняем цвет фаербола по клику

var fireball = setup.querySelector('.setup-fireball-wrap');
var fireballInput = setup.querySelector('input[name=fireball-color]');

fireball.addEventListener('click', function () {
  var currentFireballColor = getRandomData(fireballColors);
  fireball.style.background = currentFireballColor;
  fireballInput.setAttribute('value', currentFireballColor);
});
