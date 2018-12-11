import SampleCondition from './sample-condition';

describe('SampleCondition', () => {
  it('can be created', () => {
    const name = 'Condition 01';
    const value = 'A value';
    const description = 'A description';
    const sampleCondition = new SampleCondition(name, value, description);
    expect(sampleCondition.name).toBe(name);
    expect(sampleCondition.value).toBe(value);
    expect(sampleCondition.description).toBe(description);
  });

  it('can be created without a description', () => {
    const name = 'Condition 01';
    const value = 'A value';
    const sampleCondition = new SampleCondition(name, value);
    expect(sampleCondition.name).toBe(name);
    expect(sampleCondition.value).toBe(value);
    expect(sampleCondition.description).toBeUndefined();
  });

  it('can be created just with a name', () => {
    const name = 'Condition 01';
    const sampleCondition = new SampleCondition(name);
    expect(sampleCondition.name).toBe(name);
    expect(sampleCondition.value).toBeUndefined();
    expect(sampleCondition.description).toBeUndefined();
  });

  it('can change its value and description', () => {
    const name = 'Condition 01';
    const value = 'A value';
    const description = 'A description';
    const sampleCondition = new SampleCondition(name, value, description);
    expect(sampleCondition.name).toBe(name);
    expect(sampleCondition.value).toBe(value);
    expect(sampleCondition.description).toBe(description);

    sampleCondition.value = 'Another value';
    sampleCondition.description = 'Another description';
    expect(sampleCondition.value).toBe('Another value');
    expect(sampleCondition.description).toBe('Another description');
  });

  it('cannot change its name', () => {
    const name = 'Condition 01';
    const sampleCondition = new SampleCondition(name);
    expect(sampleCondition.name).toBe(name);
    expect(() => { sampleCondition.name = 'New name'; }).toThrow();
  });
});
