import SampleCondition from './sample-condition';

const map = new WeakMap();

const data = obj => map.get(obj);

class Sample {
  constructor() {
    map.set(this, {});
  }

  // get id() {
  //   const s = _.sortBy(
  //     _.values(this.conditions), condition => condition.name
  //   )
  //   .map(condition => [condition.name, condition.value].join()).join();
  //   console.log(s);
  //   return getMD5(s);
  // }

  get conditions() {
    return data(this).conditions;
  }


  getCondition(name) {
    if (!this.conditions) {
      return undefined;
    }
    return this.conditions[name];
  }

  addCondition(name, value, description) {
    const condition = new SampleCondition(name, value, description);
    if (!this.conditions) {
      data(this).conditions = {
        [condition.name]: condition,
      };
    } else {
      data(this).conditions[condition.name] = condition;
    }
  }

  setConditionValue(name, value) {
    if (!this.conditions) {
      return;
    }
    if (!this.conditions[name]) {
      return;
    }

    data(this).conditions[name].value = value;
  }

  setConditionDescription(name, description) {
    if (!this.conditions) {
      return;
    }
    if (!this.conditions[name]) {
      return;
    }

    data(this).conditions[name].description = description;
  }

  removeCondition(name) {
    if (!this.conditions) {
      return;
    }
    if (!this.conditions[name]) {
      return;
    }

    delete this.conditions[name];
  }

  toJSON() {
    return {
      conditions: JSON.stringify(this.conditions),
    };
  }

}

export default Sample;
