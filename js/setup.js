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

  var wizards = window.getWizardArrey(4);

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
})();
