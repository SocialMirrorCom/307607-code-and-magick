'use strict';

// Открываем/закрываем окно редактирования персонажей
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');


  // Функция обработчик по закрытию диалогового окна нажатием на клавишу esc, если Input в фокусе, диалоговое окно не закроется

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  // Функция открытия диалогового окна

  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.style.top = 80 + 'px';
    setup.style.left = 628 + 'px';
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия диалогового окна

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Обработчик события клик для открытия диалогового окна

  setupOpen.addEventListener('click', openPopup);

  // Обработчик события для открытия диалогового окна с помощью клавиши enter

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  // Закрываем диалоговое окно по клику на крестик

  setupClose.addEventListener('click', closePopup);

  // Закрываем диалоговое окно клавишей Enter, когда крестик находится в фокусе

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // Кастомизируем события в случае некорректно введенных данных

  setupUserName.addEventListener('invalid', function () {
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

  window.wizardCoatColorize(wizardCoat, wizardCoatInput);

  // Меняем цвет глаз волшебника по клику

  var wizardEyes = setup.querySelector('.wizard-eyes');
  var wizardEyesInput = setup.querySelector('input[name=eyes-color]');

  window.wizardEyesColorize(wizardEyes, wizardEyesInput);

  // Меняем цвет фаербола по клику

  var fireball = setup.querySelector('.setup-fireball-wrap');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  window.wizardFireballColorize(fireball, fireballInput);

  // Перетаскиваем диалоговое окно при нажатии на иконку пользователя

  var dialogHandler = setup.querySelector('.upload');

  // Пишем обработчик события нажатия на клавишу мышки

  dialogHandler.addEventListener('mousedown', function (evt) {

  // Отменяем действия браузера по умолчанию

    evt.preventDefault();

    // Определяем стартовые координаты при нажатии клавиши мышки

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    console.log(startCoords);


    var startSetupPosition  = {
    top: evt.currentTarget.offsetTop,
    left: evt.currentTarget.offsetLeft,
    };

    console.log(startSetupPosition);

    // Вводим переменную для фиксации есть ли сдвиг при клике, (так как просто клик запускает загрузку аватарки)

    var dragged = false;

    // Функция обработчик, которая определяет размер сдвига при нажатии на клавишу мышки
    // и устанавливает новые координаты для окна

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    // Функция обработчик события когда пользователь отпускает клавишу мышки

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      // Отменяет все события

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (drEvt) {
          drEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  // Функция выбора и покупки артефактов


  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})();
