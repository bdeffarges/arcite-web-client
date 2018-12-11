const map = new WeakMap();

const data = obj => map.get(obj);

class Property {
  constructor(name, value) {
    map.set(this, {
      name,
      value,
    });
  }

  get value() {
    return data(this).value;
  }

  get name() {
    return data(this).name;
  }

  set value(value) {
    data(this).value = value;
  }

  toJSON() {
    return {
      name: this.name,
      value: this.value,
    };
  }
}

export default Property;
