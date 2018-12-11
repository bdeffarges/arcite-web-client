import Design from './design';
import Sample from './sample';

const condition01 = 'condition 01';
const condition02 = 'condition 02';

function createSample() {
  const sample = new Sample();
  sample.addCondition(condition01);
  sample.addCondition(condition02);
  return sample;
}

describe('Design', () => {
  it('can be created with a description', () => {
    const description = 'My design';
    const design = new Design(description);
    expect(design.description).toBe(description);
  });

  it('can be change the description', () => {
    const description = 'My design';
    const design = new Design(description);
    expect(design.description).toBe(description);
    design.description = 'Other description';
    expect(design.description).toBe('Other description');
  });

  it('can add samples', () => {
    const design = new Design();
    const sample = createSample();
    design.addSample(sample);
    expect(design.samples).toHaveLength(1);
  });

  it('can change a sample condition', () => {
    const design = new Design();
    const sample = createSample();
    design.addSample(sample);
    expect(design.samples).toHaveLength(1);
    design.samples[0].setConditionValue(condition01, 'New value');
    design.samples[0].setConditionDescription(condition01, 'New description');
    expect(design.samples[0].getCondition(condition01).value).toBe('New value');
    expect(design.samples[0].getCondition(condition01).description).toBe('New description');
  });

  it('can remove a sample', () => {
    const design = new Design();
    const sample01 = createSample();
    const sample02 = createSample();
    design.addSample(sample01);
    design.addSample(sample02);
    expect(design.samples).toHaveLength(2);
    design.removeSample(sample01);
    expect(design.samples).toHaveLength(1);
    expect(design.samples[0]).toBe(sample02);
  });

  it('can get all distinct condition names', () => {
    const design = new Design();
    const sample01 = createSample();
    const sample02 = createSample();
    design.addSample(sample01);
    design.addSample(sample02);
    const conditionNames = design.getConditionNames();
    expect(conditionNames).toHaveLength(2);
    expect(conditionNames).toContain(condition01);
    expect(conditionNames).toContain(condition02);
  });

  it('can get all distinct values for a condition', () => {
    const design = new Design();
    const sample01 = new Sample();
    const value01 = 'Value01';
    const value02 = 'Value02';
    sample01.addCondition(condition01, value01);
    sample01.addCondition(condition02, value01);
    const sample02 = new Sample();
    sample02.addCondition(condition01, value01);
    sample02.addCondition(condition02, value02);
    design.addSample(sample01);
    design.addSample(sample02);
    const condition01Values = design.getConditionValues(condition01);
    expect(condition01Values).toHaveLength(1);
    expect(condition01Values[0]).toBe(value01);
    const condition02Values = design.getConditionValues(condition02);
    expect(condition02Values).toHaveLength(2);
    expect(condition02Values).toContain(value01);
    expect(condition02Values).toContain(value02);
  });
});
