'use strict';

(function () {
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

  window.getWizardArrey = function (heroesQuantity) {
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

  // Функция по окрашиванию элементов волшебника по клику

  window.wizardCoatColorize = function (element, input) {
    element.addEventListener('click', function () {
      var color = getRandomData(coatColors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.setAttribute('value', color);
    });
  };

  window.wizardEyesColorize = function (element, input) {
    element.addEventListener('click', function () {
      var color = getRandomData(eyesColors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.setAttribute('value', color);
    });
  };

  window.wizardFireballColorize = function (element, input) {
    element.addEventListener('click', function () {
      var color = getRandomData(fireballColors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
      input.setAttribute('value', color);
    });
  };

})();
