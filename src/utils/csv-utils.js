import papa from 'papaparse';
import _ from 'lodash';
import Design from '../model/design';
import Sample from '../model/sample';

export function getDesignFromCSV(csv) {
  const parseResult = papa.parse(csv, { header: true, skipEmptyLines: true });
  if (parseResult.errors.length) {
    throw new Error('Could not read file', parseResult.errors);
  }
  const design = new Design();
  parseResult.data.forEach((line) => {
    const sample = new Sample();
    _.keys(line).forEach((name) => {
      sample.addCondition(name, line[name], name);
    });
    design.addSample(sample);
  });
  return design;
}

export default {
  getDesignFromCSV,
};
