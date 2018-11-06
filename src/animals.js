const _addListener = Symbol('addListener');

class Animal {
  constructor (animalType, animalWeight) {
    this.animalType = animalType;
    this.animalWeight = animalWeight;
    this.$element = document.getElementById(animalType);
    this.$image = this.$element.children[0];

    this[_addListener]();
  }
  getFullName () {
    return this.animalType + ' ' + this.animalWeight;
  }

  [_addListener] (){
    this.$element.addEventListener('click', () => {
      const $personWeight = document.getElementById('weight').value;
      console.log(this.getFullName(), this.animalWeight / $personWeight, this.$image);
      console.log(this.$element.children[0].getElementsByTagName('path')[0]);
      document.getElementById('path3').setAttributeNS(null,'style','fill: green');
      //path3.style.fill='yellow';
    });
  }
}

const animals = {
  'elephant': 2700,
  'camel': 700,
  'giraffe':400,
  'baboon': 90,
  'dog': 40,
  'cat': 10
};

for (const [key, value] of Object.entries(animals)) {
  new Animal (key, value);
}



