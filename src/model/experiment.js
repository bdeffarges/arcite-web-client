import _ from 'lodash';
import { getMomentFromApi, formatNice } from '../utils/date-utils';
import Property from './property';
import File from './file';
import Design from './design';
import Sample from './sample';
import DataTransform from './data-transform';

import { FILE_TYPE_RAW_DATA, FILE_TYPE_META_DATA } from '../constants';

const map = new WeakMap();

const data = obj => map.get(obj);

class Experiment {
  constructor() {
    map.set(this, {
      properties: {},
      files: {},
      transforms: {},
    });
  }

  static extractOrganizationFromPath(path) {
    if (path) {
      const lastDotIdx = path.lastIndexOf('.');
      return path.substr(0, lastDotIdx);
    }
    return '';
  }

  static extractTypeFromPath(path) {
    if (path) {
      const lastDotIdx = path.lastIndexOf('.');
      return path.substr(lastDotIdx + 1);
    }
    return '';
  }

  static extractOrganization(apiOwner) {
    if (apiOwner) {
      return Experiment.extractOrganizationFromPath(apiOwner.organization);
    }
    return '';
  }

  static extractType(apiOwner) {
    if (apiOwner) {
      return Experiment.extractTypeFromPath(apiOwner.organization);
    }
    return '';
  }

  fromApi(apiObject) {
    data(this).id = apiObject.uid;
    data(this).title = apiObject.name;
    data(this).description = apiObject.description;
    data(this).state = apiObject.state;
    data(this).user = !apiObject.owner || apiObject.owner.person;
    data(this).organization = Experiment.extractOrganization(apiObject.owner);
    data(this).type = Experiment.extractType(apiObject.owner);
    data(this).lastUpdate = getMomentFromApi(apiObject.lastUpdate);

    // Properties
    const properties = [];
    if (apiObject.properties) {
      _.keys(apiObject.properties).forEach((key) => {
        const property = new Property(key, apiObject.properties[key]);
        properties.push(property);
      });
    }
    data(this).properties = _.keyBy(properties, 'name');

    // Design
    if (apiObject.design) {
      const design = new Design(apiObject.design.description);
      data(this).design = design;
      if (apiObject.design.samples) {
        for (const apiSample of apiObject.design.samples) {
          const sample = new Sample();
          if (apiSample.conditions) {
            for (const apiCondition of apiSample.conditions) {
              sample.addCondition(
                apiCondition.category,
                apiCondition.name,
                apiCondition.description
              );
            }
          }
          design.addSample(sample);
        }
      }
    }

    // Add the root transform
    this.addTransform(DataTransform.getStartTransform(apiObject.uid));
  }

  toApi() {
    return {
      uid: this.id,
      name: this.title,
      description: this.description,
      owner: {
        person: this.user,
        organization: `${this.organization}.${this.type}`,
      },
    };
  }

  isEditableByUser(username) {
    return !this.immutable && username === this.user;
  }

  get id() {
    return data(this).id;
  }

  set id(id) {
    data(this).id = id;
  }

  get lastUpdate() {
    return formatNice(data(this).lastUpdate);
  }

  get title() {
    return data(this).title;
  }

  get description() {
    return data(this).description;
  }

  get user() {
    return data(this).user;
  }

  get organization() {
    return data(this).organization;
  }

  get state() {
    return data(this).state;
  }

  get type() {
    return data(this).type;
  }

  get properties() {
    return data(this).properties;
  }

  get rawDataFiles() {
    const files = _.values(data(this).files).filter(file => file.type === FILE_TYPE_RAW_DATA);
    return _.keyBy(files, 'id');
  }

  get metaDataFiles() {
    const files = _.values(data(this).files).filter(file => file.type === FILE_TYPE_META_DATA);
    return _.keyBy(files, 'id');
  }

  get artifacts() {
    return data(this).artifacts;
  }

  get immutable() {
    return this.state === 'IMMUTABLE';
  }

  set title(title) {
    data(this).title = title || '';
  }

  set description(description) {
    data(this).description = description || '';
  }

  set organization(organization) {
    data(this).organization = organization || '';
  }

  set user(user) {
    data(this).user = user || '';
  }

  set type(type) {
    data(this).type = type || '';
  }

  set lastUpdate(lastUpdate) {
    data(this).lastUpdate = lastUpdate;
  }

  getProperty(name) {
    const properties = data(this).properties;
    if (!properties) {
      return undefined;
    }
    return properties[name];
  }

  addProperty(name, value) {
    const properties = data(this).properties;
    const property = new Property(name, value);
    if (!properties) {
      data(this).properties = {
        [property.name]: property,
      };
    } else {
      data(this).properties[property.name] = property;
    }
  }

  setProperty(name, value) {
    const properties = data(this).properties;

    if (!properties) {
      return;
    }

    if (!properties[name]) {
      return;
    }

    properties[name].value = value;
  }

  removeProperty(name) {
    const properties = data(this).properties;
    if (!properties) {
      return;
    }

    if (!properties[name]) {
      return;
    }

    delete properties[name];
  }

  addRawDataFile(folder, name, size) {
    const file = new File(FILE_TYPE_RAW_DATA, folder, name, size);
    this.addFile(file);
  }

  addMetaDataFile(folder, name, size) {
    const file = new File(FILE_TYPE_META_DATA, folder, name, size);
    this.addFile(file);
  }

  addDataFile(type, folder, name, size) {
    const file = new File(type, folder, name, size);
    this.addFile(file);
  }

  removeRawDataFile(file) {
    this.removeFile(file);
  }

  removeMetaDataFile(file) {
    this.removeFile(file);
  }

  addFile(file) {
    const files = data(this).files;
    if (!files) {
      data(this).files = {
        [file.id]: file,
      };
    } else {
      data(this).files[file.id] = file;
    }
  }

  removeFile(file) {
    const files = data(this).files;
    if (!files) {
      return;
    }

    if (!files[file.id]) {
      return;
    }

    delete files[file.id];
  }

  get design() {
    return data(this).design;
  }

  set design(design) {
    if (design instanceof Design) {
      data(this).design = design;
    }
  }

  addTransform(transform) {
    const transforms = data(this).transforms;
    if (!transforms) {
      data(this).transforms = {
        [transform.id]: transform,
      };
    } else {
      data(this).transforms[transform.id] = transform;
    }
  }

  get transforms() {
    return data(this).transforms;
  }

  filterArtifacts(artifacts) {
    let values;
    if (_.isArray(artifacts)) {
      values = artifacts;
    } else {
      values = _.values(artifacts);
    }
    return values.filter(value => value.experimentId === this.id);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      user: this.user,
      organization: this.organization,
      type: this.type,
      lastUpdate: this.lastUpdate,
      state: this.state,
      properties: JSON.stringify(this.properties),
      design: JSON.stringify(this.design),
      rawDataFiles: JSON.stringify(this.rawDataFiles),
      metaDataFiles: JSON.stringify(this.metaDataFiles),
      transforms: JSON.stringify(this.transforms),
      artifacts: JSON.stringify(this.artifacts),
    };
  }

}

export default Experiment;
