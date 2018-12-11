import axios from 'axios';

import { getUrl } from './api-utilities';
import Transform from '../model/transform';
import DataTransform from '../model/data-transform';
import Property from '../model/property';

function getSelectables(experimentId, transformId) {
  return axios.get(getUrl(`/experiment/${experimentId}/transform/${transformId}/selectable`));
}

export function loadTransforms() {
  const promise = new Promise((resolve, reject) => {
    axios.get(getUrl('/transform_definitions'))
      .then((res) => {
        const { data: transforms } = res;
        const data = transforms.map((transform) => {
          const transformModel = new Transform();
          transformModel.fromApi(transform);
          return transformModel;
        });
        resolve({
          data,
        });
      })
      .catch(error => reject(error));
  });

  return promise;
}

export function getExperimentTransforms(id) {
  const promise = new Promise((resolve, reject) => {
    axios.get(getUrl(`/experiment/${id}/transforms`))
      .then((res) => {
        // returns array
        const { data: transforms } = res;
        const data = transforms.map((transform) => {
          const dataTransformModel = new DataTransform();
          dataTransformModel.fromApi(transform);
          return dataTransformModel;
        });

        const selectablePromises = data.map((transform) => {
          const { experimentId, id: transformId } = transform;
          return getSelectables(experimentId, transformId);
        });

        axios.all(selectablePromises).then((selectableResults) => {
          data.forEach((transform, i) => {
            const selectablesObject = selectableResults[i].data;
            if (selectablesObject) {
              selectablesObject.selectables.forEach((selectable) => {
                const selectableModel = new Property(selectable.selectableType, selectable.items);
                transform.addSelectable(selectableModel);
              });
            }
          });
          resolve({
            data,
          });
        });
      })
      .catch(error => reject(error));
  });

  return promise;
}

export function getTransformStatus(id) {
  const promise = new Promise((resolve, reject) => {
    axios.get(getUrl(`/job_status/${id}`))
      .then((res) => {
        // returns array
        const { data: transforms } = res;
        const data = transforms.map((transform) => {
          const dataTransformModel = new DataTransform();
          dataTransformModel.fromApi(transform);
          return dataTransformModel;
        });
        resolve({
          data,
        });
      })
      .catch(error => reject(error));
  });

  return promise;
}

export function runTransform(experimentId, sourceTransformId, transform) {
  const parameters = {};
  transform.parameters.forEach((parameter) => {
    parameters[parameter.key] = parameter.value;
  });
  const postData = {
    experiment: experimentId,
    transfDefUID: transform.id,
    parameters,
  };
  const promise = new Promise((resolve, reject) => {
    let url = '';
    if (sourceTransformId) {
      postData.transformOrigin = sourceTransformId;
      url = getUrl('/run_transform/on_transform');
    } else {
      url = getUrl('/run_transform/on_raw_data');
    }
    axios.post(url, postData)
      .then((res) => {
        const { data } = res;
        resolve({
          data,
        });
      })
      .catch(err => reject(err));
  });

  return promise;
}

export default {
  loadTransforms,
  getExperimentTransforms,
  runTransform,
};
