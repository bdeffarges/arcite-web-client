import Property from './property';

const map = new WeakMap();

const data = obj => map.get(obj);

class SampleCondition extends Property {
  constructor(name, value, description) {
    super(name, value);
    map.set(this, {
      description,
    });
  }

  get description() {
    return data(this).description;
  }

  set description(description) {
    data(this).description = description;
  }

  toJSON() {
    return { ...super.toJSON(), description: this.description };
  }
}

export default SampleCondition;
