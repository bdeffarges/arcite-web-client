import axios from 'axios';

import { getUrl } from './api-utilities';
import { getExperimentTransforms } from './api-transforms';
import Experiment from '../model/experiment';
import RemoteFile from '../model/remoteFile';

// -----------------------------------------------------------------------------
// EXPERIMENTS
// -----------------------------------------------------------------------------

function getExperiment(uid) {
  return axios.get(getUrl(`/experiment/${uid}`));
}

function getFiles(uid) {
  return axios.get(getUrl(`/experiment/${uid}/files`));
}

export function loadExperiments() {
  const promise = new Promise((resolve, reject) => {
    axios.get(getUrl('/experiments'))
      .then((res) => {
        const { data: { experiments } } = res;
        const data = experiments.map((experiment) => {
          const experimentModel = new Experiment();
          experimentModel.fromApi(experiment);
          return experimentModel;
        });
        resolve({ data });
      })
      .catch(error => reject(error));
  });

  return promise;
}


export function loadExperiment(uid) {
  const promise = new Promise((resolve, reject) => {
    axios.all([
      getExperiment(uid),
      getFiles(uid),
      getExperimentTransforms(uid),
    ])
      .then(axios.spread((experimentData,
                          files,
                          transformsData) => {
        const experimentModel = new Experiment();
        experimentModel.fromApi(experimentData.data);
        if (files.data.userRawFiles) {
          for (const file of files.data.userRawFiles) {
            experimentModel.addRawDataFile(
              file.fullPath,
              file.name,
              file.fileSize
                ? file.fileSize.trim()
                : '',
            );
          }
        }
        if (files.data.rawFiles) {
          for (const file of files.data.rawFiles) {
            experimentModel.addRawDataFile(
              file.fullPath,
              file.name,
              file.fileSize
                ? file.fileSize.trim()
                : '',
            );
          }
        }
        if (files.data.metaFiles) {
          for (const metaDataFile of files.data.metaFiles) {
            experimentModel.addMetaDataFile(
              metaDataFile.fullPath,
              metaDataFile.name,
              metaDataFile.fileSize
                ? metaDataFile.fileSize.trim()
                : '',
            );
          }
        }
        for (const dataTransform of transformsData.data) {
          experimentModel.addTransform(dataTransform);
        }

        resolve({
          data: experimentModel,
        });
      }))
      .catch(error => reject(error));
  });
  return promise;
}

export function createExperiment(experiment) {
  const apiObject = experiment.toApi();
  return axios.post(getUrl('/experiment'), {
    experiment: apiObject,
  });
}

export function deleteExperiment(id) {
  return axios.delete(getUrl(`/experiment/${id}`));
}

export function cloneExperiment(id, name, description, username, organization, cloneSettings = {}) {
  return axios.post(getUrl(`/experiment/${id}/clone`), {
    name,
    description,
    owner: {
      organization,
      person: username,
    },
    ...cloneSettings,
  });
}

// -----------------------------------------------------------------------------
// DESIGN
// -----------------------------------------------------------------------------
export function uploadDesign(id, design) {
  const apiObject = design.toApi();
  return axios.post(getUrl(`/experiment/${id}/design`), {
    experiment: id,
    design: apiObject,
  });
}

// -----------------------------------------------------------------------------
// DESCRIPTION
// -----------------------------------------------------------------------------

export function editDescription(id, description) {
  return axios.put(
    getUrl(`/experiment/${id}/description`), { description }
  );
}

// -----------------------------------------------------------------------------
// FILES
// -----------------------------------------------------------------------------
export function uploadFile(id, type, file, progressHandler) {
  const data = new FormData();
  data.append('fileupload', file, file.name);

  const config = {
    onUploadProgress(progressEvent) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (progressHandler) {
        progressHandler(percentCompleted);
      }
    },
  };

  return axios.post(getUrl(`/experiment/${id}/file_upload/${type.apiEndpoint}`), data, config);
}

export function deleteFile(id, file) {
  const type = file.type;
  if (file.isRemoteFile()) {
    return axios.delete(getUrl(`/${type.apiEndpoint}_data/rm`), {
      data: {
        experiment: id,
        files: [file.folder],
      },
    });
  }

  const name = file.name;
  return axios.delete(getUrl(`/experiment/${id}/file_upload/${type.apiEndpoint}`), {
    data: {
      fileName: name,
    },
  });
}

// -----------------------------------------------------------------------------
// PROPERTIES
// -----------------------------------------------------------------------------

export function addProperties(id, properties) {
  return axios.post(getUrl(`/experiment/${id}/properties`), {
    properties,
  });
}

export function deleteProperty(id, name) {
  return axios.delete(getUrl(`/experiment/${id}/properties`), {
    data: {
      properties: [name],
    },
  });
}

// -----------------------------------------------------------------------------
// TRANSFORMS
// -----------------------------------------------------------------------------

export function loadTransforms() {
  return axios.get(getUrl('/transforms'));
}

// -----------------------------------------------------------------------------
// REMOTE FILES
// -----------------------------------------------------------------------------

export function getRemoteFolderContent(dataSource, folder) {
  // Querying for dataSources
  if (!dataSource) {
    return axios.get(getUrl('/data_sources')).then((res) => {
      const names = Object.keys(res.data.sourceFolders);
      const result = names.map(name => new RemoteFile('datasource', undefined, '', name, undefined));
      return result;
    });
  } else if (dataSource && (!folder || folder === '/')) { // Querying for files and folders in a dataSource
    return axios.get(getUrl(`/data_sources/${dataSource}`)).then((res) => {
      const result = res.data.files.map(file => new RemoteFile(file.fileType, dataSource, '/', file.name, file.fullPath));
      return result;
    });
  }
  // Querying a folder in a dataSource
  return axios.post(getUrl('/data_sources'), {
    sourceName: dataSource,
    subFolder: [folder],
  }).then((res) => {
    const result = res.data.files.map(file => new RemoteFile(file.fileType, dataSource, `${folder}`, file.name, file.fullPath));
    return result;
  });
}

export function attachRemoteFile(experimentId, type, path) {
  return axios.post(getUrl(`/${type.apiEndpoint}_data/from_source`), {
    experiment: experimentId,
    files: [path],
    symLink: true,
  });
}
