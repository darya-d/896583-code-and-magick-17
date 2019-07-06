'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

/**
 * @param {array} firstWizardNames - массив cлучайных имен мага
 */
var firstWizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

/**
 * @param {array} secondWizardNames - массив cлучайных фамилий мага
 */
var secondWizardNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

/**
 * @param {array} coatColors - массив cлучайных цветов мантии мага
 */
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

/**
 * @param {array} eyesColors - массив cлучайных цветов глаз мага
 */
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

/**
 * Функция генерации случайного значения
 * @return {number}
 */

var getRandomNumber = function (arrayLength) {
  return Math.floor(Math.random() * arrayLength);
};

/**
 * Функция генерации имени мага
 *
 * @return {number} - номер случайного элемента массива
 */

// Генерируем имя
var generateRandomFirstWizardName = function () {
  return firstWizardNames[getRandomNumber(firstWizardNames.length)];
};

// Генерируем фамилию
var generateRandomSecondWizardName = function () {
  return secondWizardNames[getRandomNumber(secondWizardNames.length)];
};

/**
 * Функция генерации цвета мантии мага
 *
 * @return {number} - номер случайного элемента массива
 */

var generateRandomСoatColor = function () {
  return coatColors[getRandomNumber(coatColors.length)];
};

/**
 * Функция генерации цвета глаз мага
 *
 * @return {number} - номер случайного элемента массива
 */

var generateRandomEyesColor = function () {
  return eyesColors[getRandomNumber(eyesColors.length)];
};

/**
 * Функция для создания массива из 4 сгенерированных JS объектов - магов.
 *
 * @param {array} wizards - массив, состоящий из 4-х сгенерированных JS объектов, описывающих похожих персонажей
 * @param {object} - сгенерированный маг, содержащий поля name, coatColor и eyesColor
 */

var wizards = [];

var generateArrayOfWizards = function () {
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: generateRandomFirstWizardName() + ' ' + generateRandomSecondWizardName(),
      coatColor: generateRandomСoatColor(),
      eyesColor: generateRandomEyesColor()
    };
  }
  return wizards;
};

generateArrayOfWizards();

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  // Имя персонажа name запишите как текст в блок .setup-similar-label;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  // Цвет мантии coatColor задайте как цвет заливки fill в стилях элемента .wizard-coat;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  // Цвет глаз eyesColor задайте как цвет заливки fill в стилях элемента .wizard-eyes.
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Отрисуйте сгенерированные DOM-элементы в блок .setup-similar-list. Для вставки элементов используйте DocumentFragment.
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Покажите блок .setup-similar, удалив у него CSS-класс hidden.
userDialog.querySelector('.setup-similar').classList.remove('hidden');
