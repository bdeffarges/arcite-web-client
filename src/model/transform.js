import TransformParameter from './transform-parameter';

const map = new WeakMap();

const data = obj => map.get(obj);

class Transform {
  constructor() {
    map.set(this, {
      parameters: [],
    });
  }

  get id() {
    return data(this).id;
  }

  get organization() {
    return data(this).organization;
  }

  get name() {
    return data(this).name;
  }

  get shortName() {
    return data(this).shortName;
  }

  get consumes() {
    return data(this).consumes;
  }

  get produces() {
    return data(this).produces;
  }

  get dependsOn() {
    return data(this).dependsOn;
  }

  set dependsOn(dependsOn) {
    data(this).dependsOn = dependsOn;
  }

  get dependsOnName() {
    return data(this).dependsOnName;
  }

  get dependsOnOrganization() {
    return data(this).dependsOnOrganization;
  }

  get description() {
    return data(this).description;
  }

  get parameters() {
    return data(this).parameters;
  }

  get dependsOnUid() {
    return data(this).dependsOnUid;
  }

  addParameter(parameter) {
    if (parameter instanceof TransformParameter) {
      if (!this.parameters) {
        data(this).parameters = [parameter];
      } else {
        data(this).parameters.push(parameter);
      }
    }
  }

  fromApi(apiObject) {
    data(this).id = apiObject.fullName.uid;
    data(this).organization = apiObject.fullName.organization;
    data(this).name = apiObject.fullName.name;
    data(this).shortName = apiObject.fullName.short_name;
    data(this).consumes = apiObject.description.consumes;
    data(this).produces = apiObject.description.produces;
    data(this).description = apiObject.description.summary;
    if (apiObject.dependsOn) {
      data(this).dependsOnName = apiObject.dependsOn.name;
      data(this).dependsOnOrganization = apiObject.dependsOn.organization;
      data(this).dependsOnUid = apiObject.dependsOn.uid;
    }
    if (apiObject.description.transformParameters) {
      const parameters = apiObject.description.transformParameters || [];
      parameters.forEach((parameterApiObject) => {
        const parameter = new TransformParameter();
        parameter.fromApi(parameterApiObject);
        this.addParameter(parameter);
      });
    }
  }

  toJSON() {
    return {
      id: data(this).id,
      organization: data(this).organization,
      name: data(this).name,
      shortName: data(this).shortName,
      consumes: data(this).consumes,
      produces: data(this).produces,
      dependsOnName: data(this).dependsOnName,
      dependsOnOrganization: data(this).dependsOnOrganization,
      dependsOnUid: data(this).dependsOnUid,
      description: data(this).description,
    };
  }
}

export default Transform;
