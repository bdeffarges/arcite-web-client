import _ from 'lodash';
import Experiment from './experiment';

const apiObject = {
  name: 'AMS0061',
  lastUpdate: '2006/12/05-10:36:04',
  description: 'GBM BIOTRIAL (Human GBM cell lines)\n_Treatment: VEH, MACi, TMZ, Combi (TMZ + MACi)\n_ Cell lines: x 12',
  uid: '1d3134ac2ea8d1c265967bfee8e60b43a5a1eee03ffdb30db4105d35375e91e7',
  owner: {
    organization: 'com.idorsia.research.microarray',
    person: 'renaulb',
  },
  properties: {
    prop01: 'value01',
    prop02: 'value02',
  },
  design: {
    description: 'My design',
    samples: [
      {
        conditions: [
          {
            category: 'barcode',
            name: '0000001',
            description: 'A barcode',
          },
          {
            category: 'position',
            name: '1',
            description: 'The position on the slide',
          },
        ],
      },
      {
        conditions: [
          {
            category: 'barcode',
            name: '0000001',
            description: 'A barcode',
          },
          {
            category: 'position',
            name: '2',
            description: 'The position on the slide',
          },
        ],
      },
    ],
  },
};

describe('Experiment', () => {
  it('can be constructed from an API object', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    expect(experiment.title).toBe(apiObject.name);
    expect(experiment.description).toBe(apiObject.description);
    expect(experiment.user).toBe(apiObject.owner.person);
    expect(experiment.organization).toBe('com.idorsia.research');
    expect(experiment.type).toBe('microarray');
  });

  it('properties are populated from API object', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    expect(Object.keys(experiment.properties)).toHaveLength(2);
    for (const propName of Object.keys(experiment.properties)) {
      const prop = experiment.getProperty(propName);
      expect(prop).toBeTruthy();
      expect(prop.name).toBeTruthy();
      expect(prop.value).toBe(`value${prop.name.substr(4)}`);
    }

    expect(experiment.design).toBeDefined();
    expect(experiment.design.description).toBe('My design');
    expect(experiment.design.samples).toHaveLength(2);
    let slidePosition = 1;
    for (const sample of experiment.design.samples) {
      expect(Object.keys(sample.conditions)).toHaveLength(2);
      expect(sample.conditions.barcode.value).toBe('0000001');
      expect(+sample.conditions.position.value).toBe(slidePosition);
      slidePosition += 1;
    }
  });

  it('can set a property to a new value', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    experiment.setProperty('prop01', 'newValue01');
    expect(experiment.getProperty('prop01').value).toBe('newValue01');
    expect(experiment.getProperty('prop02').value).toBe('value02');
  });

  it('can add a property', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    experiment.addProperty('prop03', 'value03');
    expect(experiment.getProperty('prop03').value).toBe('value03');
  });

  it('can remove a property', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    experiment.removeProperty('prop01');
    expect(experiment.getProperty('prop01')).toBeUndefined();
    expect(experiment.getProperty('prop02')).toBeDefined();
  });

  it('can add raw and meta data files', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    experiment.addRawDataFile('/data', 'myfile.txt', 20000);
    expect(experiment.rawDataFiles).toBeDefined();
    expect(_.keys(experiment.rawDataFiles)).toHaveLength(1);
    expect(_.keys(experiment.metaDataFiles)).toHaveLength(0);

    experiment.addMetaDataFile('/data', 'myfile.txt', 20000);
    expect(experiment.metaDataFiles).toBeDefined();
    expect(_.keys(experiment.rawDataFiles)).toHaveLength(1);
    expect(_.keys(experiment.metaDataFiles)).toHaveLength(1);

    expect(_.values(experiment.rawDataFiles)[0].type).toBeDefined();
    expect(_.values(experiment.rawDataFiles)[0].folder).toBe('/data');
    expect(_.values(experiment.rawDataFiles)[0].name).toBe('myfile.txt');
    expect(_.values(experiment.rawDataFiles)[0].size).toBe(20000);
    expect(_.values(experiment.metaDataFiles)[0].folder).toBe('/data');
    expect(_.values(experiment.metaDataFiles)[0].name).toBe('myfile.txt');
    expect(_.values(experiment.metaDataFiles)[0].size).toBe(20000);
  });

  it('can remove raw and meta data files', () => {
    const experiment = new Experiment();
    experiment.fromApi(apiObject);

    experiment.addRawDataFile('/data', 'myfile1.txt', 20000);
    experiment.addRawDataFile('/data', 'myfile2.txt', 20000);
    experiment.addRawDataFile('/data', 'myfile3.txt', 20000);
    experiment.addMetaDataFile('/data', 'myfile1.txt', 20000);
    experiment.addMetaDataFile('/data', 'myfile2.txt', 20000);
    experiment.addMetaDataFile('/data', 'myfile3.txt', 20000);

    expect(_.keys(experiment.rawDataFiles)).toHaveLength(3);
    expect(_.keys(experiment.metaDataFiles)).toHaveLength(3);

    experiment.removeRawDataFile(_.values(experiment.rawDataFiles)[1]);
    expect(_.keys(experiment.rawDataFiles)).toHaveLength(2);
    expect(_.keys(experiment.metaDataFiles)).toHaveLength(3);
    expect(_.values(experiment.rawDataFiles)[0].name).toBe('myfile1.txt');

    experiment.removeMetaDataFile(_.values(experiment.metaDataFiles)[0]);
    expect(_.keys(experiment.rawDataFiles)).toHaveLength(2);
    expect(_.keys(experiment.metaDataFiles)).toHaveLength(2);
    expect(_.values(experiment.metaDataFiles)[0].name).toBe('myfile2.txt');
  });
});
