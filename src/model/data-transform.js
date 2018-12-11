import _ from 'lodash';

import { getMomentFromApi, formatNice, now } from '../utils/date-utils';
import Artifact from './artifact';
import {
  RAW_DATA_DATA_TRANSFORM,
  RUNNING_DATA_TRANSFORM,
  EXECUTED_DATA_TRANSFORM,
} from '../constants';

const map = new WeakMap();

const data = obj => map.get(obj);

class DataTransform {
  constructor() {
    map.set(this, {});
  }

  static getStartTransform(experimentId) {
    const result = new DataTransform();
    result.id = experimentId;
    result.transformId = experimentId;
    result.artifacts = {};
    result.experimentId = experimentId;
    result.name = 'Raw Data';
    result.type = RAW_DATA_DATA_TRANSFORM;
    result.status = '';
    return result;
  }

  static getRunningTransform(id, experimentId, sourceTransformId, transform) {
    const result = new DataTransform();
    result.id = id;
    result.artifacts = {};
    result.experimentId = experimentId;
    result.transformId = transform.uid;
    result.name = transform.name;
    result.organization = transform.organization;
    result.sourceTransformId = sourceTransformId;
    result.startTime = now();
    result.type = RUNNING_DATA_TRANSFORM;
    result.status = 'RUNNING';
    return result;
  }

  fromApi(apiObject) {
    data(this).id = apiObject.transform;
    data(this).transformId = apiObject.transformDefinition.uid;
    data(this).artifacts = {};
    data(this).experimentId = apiObject.source.experiment;
    data(this).sourceTransformId = apiObject.source.fromTransform || apiObject.source.experiment;
    data(this).error = apiObject.errors;
    data(this).statusMessage = apiObject.feedback;
    if (apiObject.errors) {
      data(this).statusMessage += ` (${apiObject.errors})`;
    }
    if (apiObject.artifacts) {
      const artifacts = _.keys(apiObject.artifacts).map((key) => {
        const artifact = new Artifact();
        let artifactFile = apiObject.artifacts[key];
        if (artifactFile.match(/^\//)) {
          artifactFile = artifactFile.substr(1);
        }
        data(this).artifacts = artifact.fromObject({
          artifact: artifactFile,
          description: key,
          transformId: this.id,
          experimentId: this.experimentId,
        });
        return artifact;
      });
      artifacts.forEach((artifact) => {
        this.addArtifact(artifact);
      });
    }

    data(this).status = apiObject.status || '';
    data(this).name = apiObject.transformDefinition.name;
    data(this).organization = apiObject.transformDefinition.organization;
    data(this).version = apiObject.transformDefinition.version;
    data(this).startTime = getMomentFromApi(apiObject.startTime);
    data(this).endTime = getMomentFromApi(apiObject.endTime);
    data(this).type = EXECUTED_DATA_TRANSFORM;
  }

  get id() {
    return data(this).id;
  }

  set id(id) {
    data(this).id = id;
  }

  get transformId() {
    return data(this).transformId;
  }

  set transformId(transformId) {
    data(this).transformId = transformId;
  }

  get type() {
    return data(this).type;
  }

  set type(type) {
    data(this).type = type;
  }

  get artifacts() {
    return data(this).artifacts;
  }

  get selectables() {
    return data(this).selectables;
  }

  set artifacts(artifacts) {
    data(this).artifacts = artifacts;
  }

  get experimentId() {
    return data(this).experimentId;
  }

  set experimentId(experimentId) {
    data(this).experimentId = experimentId;
  }

  get sourceTransformId() {
    return data(this).sourceTransformId;
  }

  set sourceTransformId(sourceTransformId) {
    data(this).sourceTransformId = sourceTransformId;
  }

  get statusMessage() {
    return data(this).statusMessage;
  }

  get status() {
    return data(this).status;
  }

  set status(status) {
    data(this).status = status;
  }

  get name() {
    return data(this).name;
  }

  set name(name) {
    data(this).name = name;
  }

  get organization() {
    return data(this).organization;
  }

  set organization(organization) {
    data(this).organization = organization;
  }

  get version() {
    return data(this).version;
  }

  set version(version) {
    data(this).version = version;
  }

  get startTime() {
    return formatNice(data(this).startTime);
  }

  set startTime(startTime) {
    data(this).startTime = startTime;
  }

  get endTime() {
    return formatNice(data(this).endTime);
  }

  addArtifact(artifact) {
    const artifacts = data(this).artifacts;
    if (!artifacts) {
      data(this).artifacts = {
        [artifact.name]: artifact,
      };
    } else {
      data(this).artifacts[artifact.name] = artifact;
    }
  }

  addSelectable(selectable) {
    const selectables = data(this).selectables;
    if (!selectables) {
      data(this).selectables = {
        [selectable.name]: selectable,
      };
    } else {
      data(this).selectables[selectable.name] = selectable;
    }
  }

  filterArtifacts(artifacts) {
    let values;

    if (_.isArray(artifacts)) {
      values = artifacts;
    } else {
      values = _.values(artifacts);
    }

    return values.filter(value => value.transformId === this.id);
  }

  toJSON() {
    return {
      id: data(this).id,
      transformId: data(this).transformId,
      artifacts: data(this).artifacts,
      selectables: data(this).selectables,
      experimentId: data(this).experimentId,
      sourceTransformId: data(this).sourceTransformId,
      error: data(this).error,
      statusMessage: data(this).statusMessage,
      status: data(this).status,
      name: data(this).name,
      organization: data(this).organization,
      version: data(this).version,
      startTime: this.startTime,
      endTime: this.endTime,
      type: this.type,
    };
  }
}

export default DataTransform;
