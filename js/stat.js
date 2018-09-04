'use strict';

// Константы

var CLOUD_RADIUS = 140;
var CLOUD_X = 100;
var GAP = 50;
var FONT_GAP = 10;
var TEXT_HEIGHT = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_START = 90;

// Функция отрисовки облака с тенью
/* var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}; */

var renderCloud = function (ctx, radius, shadowColor, cloudColor) {
  ctx.fillStyle = shadowColor;
  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(160, 160, radius * 0.72, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(270, 160, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(420, 160, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(570, 160, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(680, 160, radius * 0.72, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.fillStyle = cloudColor;
  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(150, 150, radius * 0.72, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(260, 150, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(410, 150, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(560, 150, radius, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  ctx.save();
  ctx.scale(0.75, 1);
  ctx.beginPath();
  ctx.arc(670, 150, radius * 0.72, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

// Функция получения максимального элемента в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Функция получения рендомного процента насыщенности цвета для HSL
var getRandomSaturation = function () {
  var randomSaturation = Math.round(Math.random() * 100);
  return randomSaturation;
};

// Функция отрисовки игровой статистики
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_RADIUS, 'rgba(0, 0, 0, 0.7)', '#fff');


  ctx.fillStyle = '#000';
  ctx.fillText('Ура! Вы победили!', 150, 50);
  ctx.fillText('Список результатов:', 150, 70);
  ctx.font = '16px PT Mono';

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < players.length; i++) {
    var XSrart = CLOUD_X + GAP + (BAR_WIDTH + GAP) * i;
    var playerBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), XSrart, BAR_START + (BAR_HEIGHT - playerBarHeight));

    if (players[i] !== 'Вы') {
      ctx.fillStyle = 'hsl(210, ' + getRandomSaturation() + '%, 50%)';
      ctx.fillRect(XSrart, BAR_START + (BAR_HEIGHT - playerBarHeight) + FONT_GAP, BAR_WIDTH, playerBarHeight);
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(XSrart, BAR_START + (BAR_HEIGHT - playerBarHeight) + FONT_GAP, BAR_WIDTH, playerBarHeight);
    }

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], XSrart, BAR_START + (BAR_HEIGHT - playerBarHeight) + FONT_GAP + TEXT_HEIGHT + playerBarHeight);
  }
};
