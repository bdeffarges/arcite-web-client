import _ from 'lodash';

import { default as FileModel } from '../model/file';
import { formatFileSize } from '../utils/format-utils';

import { experiments as api } from '../api';
import * as artifactActions from './actions-artifacts';
import { goTo } from './actions-router';

export const LOAD_EXPERIMENTS_REQUEST = 'experiments/fetch__request';
export const LOAD_EXPERIMENTS_SUCCESS = 'experiments/fetch__success';
export const LOAD_EXPERIMENTS_FAILURE = 'experiments/fetch__failure';
export const LOAD_EXPERIMENT_REQUEST = 'experiment/fetch__request';
export const LOAD_EXPERIMENT_SUCCESS = 'experiment/fetch__success';
export const LOAD_EXPERIMENT_FAILURE = 'experiment/fetch__failure';
export const POLL_EXPERIMENT_REQUEST = 'experiment/poll__request';
export const POLL_EXPERIMENT_SUCCESS = 'experiment/poll__success';
export const POLL_EXPERIMENT_FAILURE = 'experiment/poll__failure';
export const CREATE_EXPERIMENT_REQUEST = 'experiment/create__request';
export const CREATE_EXPERIMENT_SUCCESS = 'experiment/create__success';
export const CREATE_EXPERIMENT_FAILURE = 'experiment/create__failure';
export const DELETE_EXPERIMENT_REQUEST = 'experiment/delete__request';
export const DELETE_EXPERIMENT_SUCCESS = 'experiment/delete__success';
export const DELETE_EXPERIMENT_FAILURE = 'experiment/delete__failure';
export const CLONE_EXPERIMENT_REQUEST = 'experiment/clone__request';
export const CLONE_EXPERIMENT_SUCCESS = 'experiment/clone__success';
export const CLONE_EXPERIMENT_FAILURE = 'experiment/clone__failure';
export const CREATE_EXPERIMENT_PROPERTY_REQUEST = 'experiment/add__property__request';
export const CREATE_EXPERIMENT_PROPERTY_SUCCESS = 'experiment/add__property__success';
export const CREATE_EXPERIMENT_PROPERTY_FAILURE = 'experiment/add__property__failure';
export const DELETE_EXPERIMENT_PROPERTY_REQUEST = 'experiment/delete__property__request';
export const DELETE_EXPERIMENT_PROPERTY_SUCCESS = 'experiment/delete__property__success';
export const DELETE_EXPERIMENT_PROPERTY_FAILURE = 'experiment/delete__property__failure';
export const UPLOAD_FILE_REQUEST = 'experiment/upload__file__request';
export const UPLOAD_FILE_PROGRESS = 'experiment/upload__file__progress';
export const UPLOAD_FILE_SUCCESS = 'experiment/upload__file__success';
export const UPLOAD_FILE_FAILURE = 'experiment/upload__file__failure';
export const DELETE_FILE_REQUEST = 'experiment/delete__file__request';
export const DELETE_FILE_SUCCESS = 'experiment/delete__file__success';
export const DELETE_FILE_FAILURE = 'experiment/delete__file__failure';
export const ATTACH_REMOTE_FILE_REQUEST = 'experiment/attach__remote__file__request';
export const ATTACH_REMOTE_FILE_SUCCESS = 'experiment/attach__remote__file__success';
export const ATTACH_REMOTE_FILE_FAILURE = 'experiment/attach__remote__file__failure';
export const UPLOAD_DESIGN_REQUEST = 'experiment/upload__design__request';
export const UPLOAD_DESIGN_SUCCESS = 'experiment/upload__design__success';
export const UPLOAD_DESIGN_FAILURE = 'experiment/upload__design__failure';
export const ENABLE_REMOTE_FILE_UPLOAD = 'experiment/enable__remote__file__upload';
export const LOAD_REMOTE_FILES_REQUEST = 'experiment/load__remote__files__request';
export const LOAD_REMOTE_FILES_SUCCESS = 'experiment/load__remote__files__success';
export const LOAD_REMOTE_FILES_FAILURE = 'experiment/load__remote__files__failure';


// -----------------------------------------------------------------------------
// SHOW EXPERIMENT
// -----------------------------------------------------------------------------
export function showExperiment(id) {
  return (dispatch) => {
    dispatch(goTo(`/experiments/${id}`));
  };
}

// -----------------------------------------------------------------------------
// LOAD EXPERIMENTS
// -----------------------------------------------------------------------------

function requestExperiments() {
  return {
    type: LOAD_EXPERIMENTS_REQUEST,
  };
}

function successExperiments(data) {
  const mappedExperiments = _.keyBy(data, 'id');
  return {
    type: LOAD_EXPERIMENTS_SUCCESS,
    payload: mappedExperiments,
  };
}

function failureExperiments(json) {
  return {
    type: LOAD_EXPERIMENTS_FAILURE,
    payload: json.error,
  };
}

export function loadExperiments() {
  return (dispatch) => {
    dispatch(requestExperiments());
    const loadPromise = api.loadExperiments();
    loadPromise.then(({ data }) => {
      dispatch(successExperiments(data));
      data.map(experiment => experiment.id).forEach((experimentId) => {
        dispatch(artifactActions.loadPublishedArtifacts(experimentId));
      });
    })
      .catch((error) => {
        dispatch(failureExperiments(error));
      });
    return loadPromise;
  };
}

// -----------------------------------------------------------------------------
// LOAD EXPERIMENT
// -----------------------------------------------------------------------------

function requestExperiment(uid) {
  return {
    type: LOAD_EXPERIMENT_REQUEST,
    payload: uid,
  };
}

function successExperiment(json) {
  const { data } = json;
  return {
    type: LOAD_EXPERIMENT_SUCCESS,
    payload: data,
  };
}

function failureExperiment(json) {
  return {
    type: LOAD_EXPERIMENT_FAILURE,
    payload: json.error,
  };
}

export function loadExperiment(uid) {
  return (dispatch) => {
    dispatch(requestExperiment(uid));
    const loadPromise = api.loadExperiment(uid);
    loadPromise.then((response) => {
      dispatch(successExperiment(response));
      dispatch(artifactActions.loadPublishedArtifacts(uid));
    })
      .catch((error) => {
        dispatch(failureExperiment(error));
      });
    return loadPromise;
  };
}


// -----------------------------------------------------------------------------
// POLL EXPERIMENT
// -----------------------------------------------------------------------------

function requestPollExperiment(uid) {
  return {
    type: POLL_EXPERIMENT_REQUEST,
    payload: uid,
  };
}

function successPollExperiment(json) {
  const { data } = json;
  return {
    type: POLL_EXPERIMENT_SUCCESS,
    payload: data,
  };
}

function failurePollExperiment(json) {
  return {
    type: POLL_EXPERIMENT_FAILURE,
    payload: json.error,
  };
}

export function pollExperiment(uid) {
  return (dispatch) => {
    dispatch(requestPollExperiment(uid));
    const loadPromise = api.loadExperiment(uid);
    loadPromise.then((response) => {
      dispatch(successPollExperiment(response));
    })
      .catch((error) => {
        dispatch(failurePollExperiment(error));
      });
    return loadPromise;
  };
}

// -----------------------------------------------------------------------------
// CREATE EXPERIMENT
// -----------------------------------------------------------------------------

function requestCreateExperiment(experiment) {
  return {
    type: CREATE_EXPERIMENT_REQUEST,
    payload: experiment,
  };
}

function successCreateExperiment(json) {
  const { data } = json;
  return {
    type: CREATE_EXPERIMENT_SUCCESS,
    payload: data,
  };
}

function failureCreateExperiment(error) {
  return {
    type: CREATE_EXPERIMENT_FAILURE,
    payload: error,
  };
}

export function createExperiment(experiment) {
  return (dispatch) => {
    dispatch(requestCreateExperiment(experiment));
    const loadPromise = api.createExperiment(experiment);
    loadPromise.then((response) => {
      dispatch(successCreateExperiment(response));
    })
      .catch((error) => {
        dispatch(failureCreateExperiment(error));
      });
    return loadPromise;
  };
}

// -----------------------------------------------------------------------------
// DELETE EXPERIMET
// -----------------------------------------------------------------------------

function requestDeleteExperiment(id) {
  return {
    type: DELETE_EXPERIMENT_REQUEST,
    payload: id,
  };
}

function successDeleteExperiment(id) {
  return {
    type: DELETE_EXPERIMENT_SUCCESS,
    payload: id,
  };
}

function failureDeleteExperiment(error) {
  return {
    type: DELETE_EXPERIMENT_FAILURE,
    payload: error,
  };
}

export function deleteExperiment(id) {
  return (dispatch) => {
    dispatch(requestDeleteExperiment(id));
    const deletePromise = api.deleteExperiment(id);
    deletePromise.then(() => {
      dispatch(successDeleteExperiment(id));
    })
      .catch((error) => {
        dispatch(failureDeleteExperiment(error));
      });
    return deletePromise;
  };
}

// -----------------------------------------------------------------------------
// CLONE EXPERIMENT
// -----------------------------------------------------------------------------

function requestCloneExperiment(experiment) {
  return {
    type: CLONE_EXPERIMENT_REQUEST,
    payload: experiment,
  };
}

function successCloneExperiment(json) {
  const { data } = json;
  return {
    type: CLONE_EXPERIMENT_SUCCESS,
    payload: data,
  };
}

function failureCloneExperiment(error) {
  return {
    type: CLONE_EXPERIMENT_FAILURE,
    payload: error,
  };
}

export function cloneExperiment(id, name, description, username, organization, cloneSettings) {
  return (dispatch) => {
    dispatch(requestCloneExperiment(id));
    const loadPromise = api.cloneExperiment(
      id,
      name,
      description,
      username,
      organization,
      cloneSettings
    );
    loadPromise.then((response) => {
      dispatch(successCloneExperiment(response));
    })
      .catch((error) => {
        dispatch(failureCloneExperiment(error));
      });
    return loadPromise;
  };
}

// -----------------------------------------------------------------------------
// CREATE PROPERTY
// -----------------------------------------------------------------------------

function requestAddProperties(experimentId, properties) {
  return {
    type: CREATE_EXPERIMENT_PROPERTY_REQUEST,
    payload: {
      experimentId,
      properties,
    },
  };
}

function successAddProperties(experimentId, properties) {
  return {
    type: CREATE_EXPERIMENT_PROPERTY_SUCCESS,
    payload: {
      experimentId,
      properties,
    },
  };
}

function failureAddProperties(error) {
  return {
    type: CREATE_EXPERIMENT_PROPERTY_FAILURE,
    payload: error,
  };
}

export function addProperties(experimentId, properties) {
  return (dispatch) => {
    const apiProps = {};
    _.values(properties)
      .filter(prop => !prop.persisted)
      .forEach((property) => {
        apiProps[property.name] = property.value;
      });

    dispatch(requestAddProperties(experimentId, properties));
    const promise = api.addProperties(experimentId, apiProps);
    promise.then(() => {
      dispatch(successAddProperties(experimentId, properties));
      // dispatch(uiActions.clearProperties());
    })
      .catch((error) => {
        dispatch(failureAddProperties(error));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// CREATE PROPERTY
// -----------------------------------------------------------------------------

function requestDeleteProperty(experimentId, propertyName) {
  return {
    type: DELETE_EXPERIMENT_PROPERTY_REQUEST,
    payload: {
      experimentId,
      propertyName,
    },
  };
}

function successDeleteProperty(experimentId, propertyName) {
  return {
    type: DELETE_EXPERIMENT_PROPERTY_SUCCESS,
    payload: {
      experimentId,
      propertyName,
    },
  };
}

function failureDeleteProperty(error) {
  return {
    type: DELETE_EXPERIMENT_PROPERTY_FAILURE,
    payload: error,
  };
}

export function deleteProperty(experimentId, name) {
  return (dispatch) => {
    dispatch(requestDeleteProperty(experimentId, name));
    const promise = api.deleteProperty(experimentId, name);
    promise.then(() => {
      dispatch(successDeleteProperty(experimentId, name));
    })
      .catch((error) => {
        dispatch(failureDeleteProperty(error));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// FILE
// -----------------------------------------------------------------------------

function convertFile(file, type) {
  return new FileModel(type, type.folder, file.name, formatFileSize(file.size));
}

function requestUploadFile(experimentId, fileObject) {
  return {
    type: UPLOAD_FILE_REQUEST,
    payload: {
      experimentId,
      file: fileObject,
    },
  };
}

function successUploadFile(experimentId, fileObject) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: {
      experimentId,
      file: fileObject,
    },
  };
}

function progressUploadFile(fileObject) {
  return {
    type: UPLOAD_FILE_PROGRESS,
    payload: {
      file: fileObject,
    },
  };
}

function failureUploadFile(error) {
  return {
    type: UPLOAD_FILE_FAILURE,
    payload: error,
  };
}

export function uploadFile(experimentId, type, file) {
  return (dispatch) => {
    const fileObj = convertFile(file, type);
    const progressHandler = (progress) => {
      fileObj.progress = progress;
      dispatch(progressUploadFile(fileObj));
    };

    dispatch(requestUploadFile(experimentId, fileObj));
    const promise = api.uploadFile(experimentId, type, file, progressHandler());
    promise.then(() => {
      dispatch(successUploadFile(experimentId, fileObj));
    })
      .catch((error) => {
        dispatch(failureUploadFile(error));
      });
    return promise;
  };
}


function requestDeleteFile(experimentId, file) {
  return {
    type: DELETE_FILE_REQUEST,
    payload: {
      experimentId,
      file,
    },
  };
}

function successDeleteFile(experimentId, file) {
  return {
    type: DELETE_FILE_SUCCESS,
    payload: {
      experimentId,
      file,
    },
  };
}

function failureDeleteFile(error) {
  return {
    type: DELETE_FILE_FAILURE,
    payload: error,
  };
}

export function deleteFile(experimentId, file) {
  return (dispatch) => {
    dispatch(requestDeleteFile(experimentId, file));
    const promise = api.deleteFile(experimentId, file);
    promise.then(() => {
      dispatch(successDeleteFile(experimentId, file));
    })
      .catch((error) => {
        dispatch(failureDeleteFile(error));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// UPLOAD DESIGN
// -----------------------------------------------------------------------------

function requestUploadDesign(experimentId) {
  return {
    type: UPLOAD_DESIGN_REQUEST,
    payload: experimentId,
  };
}

function successUploadDesign(experimentId, design) {
  return {
    type: UPLOAD_DESIGN_SUCCESS,
    payload: {
      experimentId,
      design,
    },
  };
}

function failureUploadDesign(error) {
  return {
    type: UPLOAD_DESIGN_FAILURE,
    payload: error,
  };
}

export function uploadDesign(id, design) {
  return (dispatch) => {
    dispatch(requestUploadDesign(id));
    const promise = api.uploadDesign(id, design);
    promise.then(() => {
      dispatch(successUploadDesign(id, design));
    })
      .catch((error) => {
        dispatch(failureUploadDesign(error));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// LOAD REMOTE FILES TO DISPLAY
// -----------------------------------------------------------------------------
function requestLoadRemoteFiles() {
  return {
    type: LOAD_REMOTE_FILES_REQUEST,
  };
}

function successLoadRemoteFiles(type, dataSource, folder, files) {
  return {
    type: LOAD_REMOTE_FILES_SUCCESS,
    payload: {
      type,
      dataSource,
      folder,
      files,
    },
  };
}

function failureLoadRemoteFiles(error) {
  return {
    type: LOAD_REMOTE_FILES_FAILURE,
    payload: error,
  };
}

export function loadRemoteFiles(type, dataSource, folder) {
  return (dispatch) => {
    dispatch(requestLoadRemoteFiles(dataSource, folder));
    const promise = api.getRemoteFolderContent(dataSource, folder);
    promise.then((files) => {
      dispatch(successLoadRemoteFiles(type, dataSource, folder, files));
    })
      .catch((error) => {
        dispatch(failureLoadRemoteFiles(error));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// ALLOW REMOTE FILES
// -----------------------------------------------------------------------------
export function enableRemoteFileUpload(type, enable) {
  return (dispatch) => {
    dispatch(loadRemoteFiles(type)).then(() => {
      dispatch({
        type: ENABLE_REMOTE_FILE_UPLOAD,
        payload: {
          type,
          enable,
        },
      });
    });
  };
}


// -----------------------------------------------------------------------------
// ATTACH REMOTE FILE
// -----------------------------------------------------------------------------

function requestAttachRemoteFile(experimentId, path) {
  return {
    type: ATTACH_REMOTE_FILE_REQUEST,
    payload: {
      experimentId,
      path,
    },
  };
}

function successAttachRemoteFile(experimentId, remoteFile) {
  return {
    type: ATTACH_REMOTE_FILE_SUCCESS,
    payload: {
      experimentId,
      remoteFile,
    },
  };
}

function failureAttachRemoteFile(error) {
  return {
    type: ATTACH_REMOTE_FILE_FAILURE,
    payload: error,
  };
}

export function attachRemoteFile(experimentId, type, remoteFile) {
  return (dispatch) => {
    const { remotePath } = remoteFile;
    dispatch(requestAttachRemoteFile(experimentId, remotePath));
    const promise = api.attachRemoteFile(experimentId, type, remotePath);
    promise.then(() => {
      dispatch(successAttachRemoteFile(experimentId, remoteFile));
      dispatch(pollExperiment(experimentId));
    })
      .catch((error) => {
        dispatch(failureAttachRemoteFile(error));
      });
    return promise;
  };
}

