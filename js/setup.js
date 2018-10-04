'use strict';

// Находим и показываем, убрав класс hidden, блок setup
(function () {
  var setup = document.querySelector('.setup');

  // Создаем массив, состоящий из 4 сгенерированных JS объектов

  // Находим и сохраняем в переменную список похожих персонажей

  var similarListElement = setup.querySelector('.setup-similar-list');

  // Находим шаблон и элемент, который мы будем клонировать и сохраняем в переменную

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  // Запускаем функцию по созданию массива

  // var wizards = window.getWizardArrey(4);

  // Функция по созданию одного элемента по шаблону

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var randomIndex = [];
    for (var i = 0; i < 4; i++) {
      randomIndex.push(Math.floor(Math.random() * wizards.length));
    }

    var fragment = document.createDocumentFragment();

    for (var j = 0; j < randomIndex.length; j++) {

      fragment.appendChild(renderWizard(wizards[randomIndex[i]]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.save(new FormData(form), function (response) {
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
