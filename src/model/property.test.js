import Property from './property';

describe('Property', () => {
  it('can be created', () => {
    const name = 'prop01';
    const value = 'value01';
    const property = new Property(name, value);
    expect(property.name).toBe(name);
    expect(property.value).toBe(value);
  });

  it('can change its value', () => {
    const name = 'prop01';
    const value = 'value01';
    const property = new Property(name, value);
    expect(property.value).toBe(value);
    property.value = 'New value';
    expect(property.value).toBe('New value');
  });

  it('cannot change its name', () => {
    const name = 'prop01';
    const value = 'value01';
    const property = new Property(name, value);
    const setName = () => {
      property.name = 'New name';
    };

    expect(property.name).toBe(name);
    expect(setName).toThrow();
  });
});
