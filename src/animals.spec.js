import {Animal} from './animals.js';

const weightInput = document.createElement('input');
weightInput.value = 100;
const baboonTest = new Animal({
  'animalType': 'baboon',
  'animalWeight': 100,
  'weightInput': weightInput
}, null)


describe('Animal::', () => {
  it('should return a relativeWeight', () => {
    expect(baboonTest.compare()).toEqual(1);
  });

});
