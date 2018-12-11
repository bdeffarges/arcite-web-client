import Sample from './sample';

describe('Sample', () => {
  it('can get conditions', () => {
    const sample = new Sample();
    sample.addCondition('condition 01', 'value 01', 'description');
    expect(Object.keys(sample.conditions).length).toBe(1);
  });

  it('can get a single condition', () => {
    const sample = new Sample();
    const name = 'condition 01';
    const value = 'value 01';
    const description = 'description';
    sample.addCondition(name, value, description);
    expect(sample.getCondition(name).name).toBe(name);
    expect(sample.getCondition(name).value).toBe(value);
    expect(sample.getCondition(name).description).toBe(description);
  });

  it('can remove a condition', () => {
    const sample = new Sample();
    const name01 = 'condition 01';
    const name02 = 'condition 02';
    const value = 'value';
    const description = 'description';
    sample.addCondition(name01, value, description);
    sample.addCondition(name02, value, description);
    expect(sample.getCondition(name01)).toBeDefined();
    expect(sample.getCondition(name02)).toBeDefined();
    expect(Object.keys(sample.conditions).length).toBe(2);
    sample.removeCondition(name01);
    expect(sample.conditions[name01]).toBeUndefined();
    expect(Object.keys(sample.conditions).length).toBe(1);
  });

  it('can change a condition', () => {
    const sample = new Sample();
    const name01 = 'condition 01';
    const value = 'value';
    const description = 'description';
    sample.addCondition(name01, value, description);

    expect(sample.getCondition(name01)).toBeDefined();

    sample.setConditionValue(name01, 'New value');
    sample.setConditionDescription(name01, 'New description');

    expect(sample.getCondition(name01).value).toBe('New value');
    expect(sample.getCondition(name01).description).toBe('New description');
  });
});
