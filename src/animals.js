const _addListener = Symbol('addListener');

class Animal {
  constructor (params, parentRef = null) {
    this.animalType = params.animalType;
    this.animalWeight = params.animalWeight;
    this.weightInput = params.weightInput;
    this.allAnimals = parentRef;
    this.$element = document.getElementById(params.animalType);
    this.$image = this.$element !== null ? this.$element.children[0] : null;
    this.active = false;

    if (this.allAnimals !== null) {
      this[_addListener]();
    }
  }

  setColor (color) {
    const svgPath = this.$element.children[0].getElementsByTagName('path')[0];
    svgPath.setAttributeNS(null,'style',`fill: ${color}`);
  }

  isActive (){
    return this.active;
  }

  getImage () {
    return this.$image;
  }

  activate () {
    this.active = true;
    this.allAnimals.setActiveAnimal(this);
  }

  deActivate () {
    this.active = false;
    this.allAnimals.resetActiveAnimal();
  }

  validate () {
    const $personWeight = this.weightInput.value;

    return /^([0-1]{0,1}[0-9]{1,2}|200)$/gi.test($personWeight);
  }

  compare () {
    const $personWeight = this.weightInput.value;

    const relativeWeight = $personWeight / this.animalWeight;

    return relativeWeight;
  }

  [_addListener] (){
    this.$element.addEventListener('click', () => {

      this.allAnimals.resetAll();
      this.setColor('green');
      this.activate();
    });
  }
}

class Animals {
  constructor (animalsList, weightInput, defaultColor = '#000') {
    this.animals = [];
    this.defaultColor = defaultColor;
    this.activeAnimal = null;
    this.weightInput = weightInput;

    for (const [key, value] of Object.entries(animalsList)) {
      this.createNew (key, value);
    }
  }

  createNew (animalType, animalWeight) {
    this.animals.push( new Animal({
      'animalType': animalType,
      'animalWeight': animalWeight,
      'weightInput': this.weightInput
    }, this));
  }

  getAll () {
    return this.animals;
  }

  setActiveAnimal (animal) {
    this.activeAnimal = animal;
  }

  resetActiveAnimal () {
    this.activeAnimal = null;
  }

  resetAll () {
    this.getAll().forEach( it => {
      it.setColor(this.defaultColor);
      it.deActivate();
    });
  }
}

export {Animals, Animal};
