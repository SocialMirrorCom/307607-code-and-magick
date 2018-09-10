'use strict';

// Находим и показываем, убрав класс hidden, блок setup

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Создаем массив, состоящий из 4 сгенерированных JS объектов

var names = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var surnames = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = ['black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Функция по получению случайного индекса массива

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

var similarListElement = userDialog.querySelector('.setup-similar-list');

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

userDialog.querySelector('.setup-similar').classList.remove('hidden');
