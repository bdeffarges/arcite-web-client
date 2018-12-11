import Experiment from '../model/experiment';
import experimentsData from './data/experiments.json';
import experimentData from './data/experiment.json';
import { getExperimentTransforms } from './api-transforms-dev';
import Logger from '../logger';

export function loadExperiments() {
  const promise = new Promise((resolve) => {
    const data = experimentsData.experiments.map((experiment) => {
      const experimentModel = new Experiment();
      experimentModel.fromApi(experiment);
      return experimentModel;
    });
    resolve({
      data,
    });
  });
  return promise;
}

export function loadExperiment() {
  const promise = new Promise((resolve) => {
    const experimentModel = new Experiment();
    experimentModel.fromApi(experimentData);
    const transforms = getExperimentTransforms();
    for (const transform of transforms) {
      Logger.debug(transform);
      experimentModel.addTransform(transform);
    }
    resolve({
      data: experimentModel,
    });
  });
  return promise;
}


export function addProperties(id, properties) {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      Logger.info(`Adding properties to experiment ${id}`, properties);
      resolve(true);
    }, 2000);
  });
  return promise;
}

export function deleteProperty(id, name) {
  Logger.info(`Deleting property ${name} for experiment ${id}`);
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      Logger.info(`Deleted property ${name} for experiment ${id}`);
      resolve(true);
    }, 2000);
  });
  return promise;
}
