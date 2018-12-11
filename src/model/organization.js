import ExperimentType from './experimentType';

const map = new WeakMap();

const data = obj => map.get(obj);

class Organization {
  constructor() {
    map.set(this, {});
  }

  fromApi(apiObject) {
    data(this).name = apiObject.name;
    data(this).department = apiObject.department;
    data(this).root = apiObject.rootPackagePath;
    apiObject.experimentTypes.forEach((experimentTypeApiObject) => {
      const experimentType = new ExperimentType();
      experimentType.fromApi(experimentTypeApiObject);
      this.addExperimentType(experimentType);
    });
  }

  get name() {
    return data(this).name;
  }

  get department() {
    return data(this).department;
  }

  get root() {
    return data(this).root;
  }

  get experimentTypes() {
    return data(this).experimentTypes;
  }

  addExperimentType(experimentType) {
    const experimentTypes = data(this).experimentTypes;
    if (!experimentTypes) {
      data(this).experimentTypes = {
        [experimentType.name]: experimentType,
      };
    } else {
      data(this).experimentTypes[experimentType.name] = experimentType;
    }
  }

  toJSON() {
    return {
      name: this.name,
      department: this.department,
      root: this.root,
      experimentTypes: JSON.stringify(this.experimentTypes),
    };
  }
}

export default Organization;
