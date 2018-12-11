import _ from 'lodash';

const map = new WeakMap();

const data = obj => map.get(obj);

class TransformParameter {
  constructor() {
    map.set(this, {});
  }

  fromApi(apiObject) {
    data(this).id = apiObject.parameterID;
    data(this).formKey = apiObject.parameterID.replace(/\./g, '_');
    data(this).apiKey = apiObject.parameterName;
    data(this).name = _.upperFirst(apiObject.parameterName.replace(/\./g, ' '));
    data(this).type = apiObject.parameterType;
    data(this).defaultValue = apiObject.defaultValue;
    data(this).options = _.omit(apiObject, 'name', 'type', 'defaultValue');
  }

  get key() {
    return data(this).id;
  }

  get formKey() {
    return data(this).formKey;
  }

  get apiKey() {
    return data(this).apiKey;
  }

  get name() {
    return data(this).name;
  }

  get type() {
    return data(this).type;
  }

  get defaultValue() {
    return data(this).defaultValue;
  }

  get options() {
    return data(this).options;
  }

  get value() {
    return data(this).value;
  }

  get id() {
    return data(this).id;
  }

  updateValue(value) {
    data(this).value = value;
  }
}

export default TransformParameter;
