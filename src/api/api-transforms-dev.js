import uuid from 'node-uuid';

import transformsData from './data/transforms.json';
import dataTransformsData from './data/dataTransforms.json';
import Transform from '../model/transform';
import DataTransform from '../model/data-transform';
import Logger from '../logger';

export function loadTransforms() {
  const promise = new Promise((resolve) => {
    const data = transformsData.transforms.map((transform) => {
      const transformModel = new Transform();
      transformModel.fromApi(transform);
      return transformModel;
    });
    resolve({
      data,
    });
  });
  return promise;
}

export function getExperimentTransforms() {
  const data = dataTransformsData.transforms.map((transform) => {
    const transformModel = new DataTransform();
    transformModel.fromApi(transform);
    return transformModel;
  });
  Logger.debug(data);
  return data;
}

export function runTransform() {
  const promise = new Promise((resolve) => {
    resolve({
      data: uuid.v1(),
    });
  });

  return promise;
}

export default {
  loadTransforms,
};
