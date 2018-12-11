const map = new WeakMap();

const data = obj => map.get(obj);

class ExperimentType {
  constructor() {
    map.set(this, {});
  }

  fromApi(apiObject) {
    data(this).name = apiObject.name;
    data(this).description = apiObject.description;
    data(this).path = apiObject.packagePath;
  }

  get name() {
    return data(this).name;
  }

  get description() {
    return data(this).description;
  }

  get path() {
    return data(this).path;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      path: this.path,
    };
  }
}

export default ExperimentType;
