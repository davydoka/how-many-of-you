import './style.scss';
import SVGInject from '@iconfu/svg-inject';
import {svgAddAttributes} from './svg.js';
import {Animals} from './animals.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then( registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch( registrationError => {
      console.log('ServiceWorker registration failed: ', registrationError);
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  SVGInject(document.getElementsByClassName('injectable'), {beforeInject: svgAddAttributes});
});

const animals = new Animals({
  'elephant': 2700,
  'camel': 480,
  'giraffe': 800,
  'baboon': 100,
  'dog': 45,
  'cat': 4
}, document.getElementById('weight'));

const $modal = document.getElementById('myModal');

document.getElementById('calc').onclick = function () {
  const $modalInfo = document.getElementById('info');
  const $modalImg = document.getElementById('result_img');

  if (animals.activeAnimal === null) {
    alert('Please select some animal to compare with.');
    return null;
  }
  if (! animals.activeAnimal.validate()) {
    alert('Please enter correct value into the weight field');
    return null;
  }
  const relativeWeight = animals.activeAnimal.compare();

  $modalInfo.innerHTML = relativeWeight <= 1
    ? `Your weight is ${Math.trunc(relativeWeight * 100)}%
      of ${animals.activeAnimal.animalType}'s weight.`
    : `The ${animals.activeAnimal.animalType}'s mass is ${Math.trunc(1 / relativeWeight * 100)}% 
      of your weight.`;

  $modalImg.setAttribute('src',
    animals.activeAnimal.getImage().getAttribute('src')
  );
  $modalImg.setAttribute('data-viewBox',
    animals.activeAnimal.getImage().getAttribute('data-viewBox')
  );
  SVGInject($modalImg, {beforeInject: svgAddAttributes});

  $modal.style.display = 'block';
}

document.getElementsByClassName('close')[0].onclick = function () {
  $modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target === $modal) {
    $modal.style.display = 'none';
  }
}

