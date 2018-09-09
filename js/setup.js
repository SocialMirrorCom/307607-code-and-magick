// Находим и показываем, убрав класс hidden, блок setup

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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

var heroesQuantity = 4;

var getRandomData = function(arrey) {
  var randomIndex = Math.floor(Math.random() * arrey.length);
  var data = arrey[randomIndex];
  return data;
};

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

console.log(getHeroesArrey(heroesQuantity));

