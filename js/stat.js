'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 50;
var FONT_GAP = 10;
var TEXT_HEIGHT = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_START = 90;
var barGrathHeight = FONT_GAP + TEXT_HEIGHT;


var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomSaturation = function () {
  var randomSaturation = Math.round(Math.random() * 100);
  return randomSaturation;
}

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.fillText('Ура! Вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);
  ctx.font = '16px PT Mono';

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_START + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));

    if (players[i] !== 'Вы') {
      ctx.fillStyle = 'hsl(210, ' + getRandomSaturation() + '%, 50%)';
      ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_START + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) + FONT_GAP, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_START + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) + FONT_GAP, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    }

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, BAR_START + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime) + barGrathHeight + (BAR_HEIGHT * times[i]) / maxTime);
  }
};
