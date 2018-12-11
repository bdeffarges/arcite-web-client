import TransformParameter from './transform-parameter';

const apiObject = {
  parameterID: 'number.of.copies',
  parameterType: 'INT_NUMBER',
  minBoundary: 2,
  maxBoundary: 10000,
  parameterName: 'Number of copies',
  defaultValue: 5,
};

describe('Transform Parameter', () => {
  it('can be read from api object', () => {
    const transformParameter = new TransformParameter();
    transformParameter.fromApi(apiObject);
    expect(transformParameter.id).toBe('number.of.copies');
    expect(transformParameter.name).toBe('Number of copies');
    expect(transformParameter.type).toBe('INT_NUMBER');
    expect(transformParameter.defaultValue).toBe(5);
    const { options } = transformParameter;
    expect(options).toBeDefined();
    expect(options.name).toBeUndefined();
    expect(options.type).toBeUndefined();
    expect(options.defaultValue).toBeUndefined();
    expect(options.minBoundary).toBe(apiObject.minBoundary);
    expect(options.maxBoundary).toBe(apiObject.maxBoundary);
  });
});
