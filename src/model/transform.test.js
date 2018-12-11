import Transform from './transform';
import TransformParameter from './transform-parameter';

const apiObject = {
  fullName: {
    organization: 'com.idorsia.research.arcite.core',
    name: 'duplicate-text',
    version: '1.0.0',
    short_name: 'duplicate-text',
    uid: 'com.idorsia.research.arcite.core@@duplicate-text@@1.0.0',
  },
  description: {
    summary: 'duplicate-text',
    consumes: 'upper-cased-text',
    produces: 'duplicated',
    transformParameters: [
      {
        parameterID: 'number.of.copies',
        parameterType: 'INT_NUMBER',
        minBoundary: 2,
        maxBoundary: 10000,
        parameterName: 'Number of copies',
        defaultValue: 5,
      },
    ],
  },
  dependsOn: {
    organization: 'com.idorsia.research.arcite.core',
    name: 'to-uppercase',
    version: '1.0.0',
    short_name: 'to-uppercase',
    uid: 'com.idorsia.research.arcite.core@@to-uppercase@@1.0.0',
  },
};

describe('Transform', () => {
  it('can be read from api object', () => {
    const transform = new Transform();
    transform.fromApi(apiObject);
    expect(transform.id).toBe(apiObject.fullName.uid);
    expect(transform.name).toBe(apiObject.fullName.name);
    expect(transform.organization).toBe(apiObject.fullName.organization);
    expect(transform.description).toBe(apiObject.description.summary);
    expect(transform.consumes).toBe(apiObject.description.consumes);
    expect(transform.produces).toBe(apiObject.description.produces);
    expect(transform.shortName).toBe(apiObject.fullName.short_name);
    expect(transform.dependsOnName).toBe(apiObject.dependsOn.name);
    expect(transform.dependsOnOrganization).toBe(apiObject.dependsOn.organization);
    expect(transform.parameters).toBeDefined();
    expect(transform.parameters).toHaveLength(1);
  });
  it('can add a parameter', () => {
    const transform = new Transform();
    transform.fromApi(apiObject);
    expect(transform.parameters).toHaveLength(1);
    const parameter = new TransformParameter();
    parameter.fromApi(apiObject.description.transformParameters[0]);
    transform.addParameter(parameter);
    expect(transform.parameters).toHaveLength(2);
  });
});
