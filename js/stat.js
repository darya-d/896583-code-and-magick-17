'use strict';

var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var CLOUD_WIDTH = 500;
var CLOUD_HEIGHT = 250;
var GAP = 10;

var BAR_START_X = 210;
var BAR_START_Y = 160;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = -150;
var BAR_GAP = 70;

var PLAYER_START_Y = 235;

var SCORE_START_Y = 240;

/**
 * Функция отрисовывает облака для статистики
 *
 * @param {object} ctx - контекст отображения
 * @param {number} x - начальная координата по горизонтали
 * @param {number} y - начальная координата по вертикали
 * @param {string} color - цвет фона облака
 */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * Функция получает максимальный результат из массива чисел
 *
 * @param {array} arr - массив очков
 * @return {number} maxElement - значение максимального количества очков
 */
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

/**
 * Функция отрисовывает гистограмму
 *
 * @param {object} ctx - контекст отображения
 * @param {array} players - массив имен игроков
 * @param {array} times - массив очков игроков (в секундах)
 */
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_START_X + GAP, CLOUD_START_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, '#fff');

  // Выводим текст: поздравление с победой и список результатов
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 140, 25);
  ctx.fillText('Список результатов:', 140, 40);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    // Определяем цвет текста
    ctx.fillStyle = '#000';
    // Выводим имена игроков под гистограммой
    ctx.fillText(players[i], BAR_START_X + GAP + BAR_GAP * i, PLAYER_START_Y);
    // Выводим очки над гистограммой
    ctx.fillText(Math.round(times[i]), BAR_START_X + GAP + BAR_GAP * i, (SCORE_START_Y - (BAR_HEIGHT_MAX * times[i]) / maxTime * - 1) - 3 * GAP);
    // Определяем цвет игрока 'Вы' и генерируем saturation синего цвета остальных игроков
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + (Math.random() * 100 + 1) + '%, 50%)';
    }
    // Рисуем гистограмму исходя из очков
    ctx.fillRect(BAR_START_X + GAP + BAR_GAP * i, BAR_START_Y + BAR_GAP, BAR_WIDTH, (BAR_HEIGHT_MAX * times[i]) / maxTime);
  }
};
