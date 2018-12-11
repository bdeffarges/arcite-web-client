import _ from 'lodash';

import DataTransform from '../model/data-transform';
import RemoteFile from '../model/remoteFile';


import * as utils from './reducer-utilities';
import editReducer, { initialState as editInitialState } from './reducer-edit-experiment';

import {
  LOAD_EXPERIMENTS_REQUEST,
  LOAD_EXPERIMENTS_SUCCESS,
  LOAD_EXPERIMENTS_FAILURE,
  LOAD_EXPERIMENT_REQUEST,
  LOAD_EXPERIMENT_SUCCESS,
  LOAD_EXPERIMENT_FAILURE,
  POLL_EXPERIMENT_REQUEST,
  POLL_EXPERIMENT_SUCCESS,
  POLL_EXPERIMENT_FAILURE,
  CREATE_EXPERIMENT_REQUEST,
  CREATE_EXPERIMENT_SUCCESS,
  CREATE_EXPERIMENT_FAILURE,
  DELETE_EXPERIMENT_REQUEST,
  DELETE_EXPERIMENT_SUCCESS,
  DELETE_EXPERIMENT_FAILURE,
  CLONE_EXPERIMENT_REQUEST,
  CLONE_EXPERIMENT_SUCCESS,
  CLONE_EXPERIMENT_FAILURE,
  CREATE_EXPERIMENT_PROPERTY_REQUEST,
  CREATE_EXPERIMENT_PROPERTY_SUCCESS,
  CREATE_EXPERIMENT_PROPERTY_FAILURE,
  DELETE_EXPERIMENT_PROPERTY_REQUEST,
  DELETE_EXPERIMENT_PROPERTY_SUCCESS,
  DELETE_EXPERIMENT_PROPERTY_FAILURE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_PROGRESS,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
  UPLOAD_DESIGN_REQUEST,
  UPLOAD_DESIGN_SUCCESS,
  UPLOAD_DESIGN_FAILURE,
  ENABLE_REMOTE_FILE_UPLOAD,
  LOAD_REMOTE_FILES_REQUEST,
  LOAD_REMOTE_FILES_SUCCESS,
  LOAD_REMOTE_FILES_FAILURE,
} from '../actions/actions-experiments';

import {
  ADD_NEW_PROPERTY,
  REMOVE_NEW_PROPERTY,
  UPDATE_NEW_PROPERTY,
  CLEAR_NEW_PROPERTIES,
  VALIDATE_NEW_PROPERTIES,
  EDIT_DESCRIPTION_START,
  EDIT_DESCRIPTION_CHANGE,
  EDIT_DESCRIPTION_COMMIT,
  EDIT_DESCRIPTION_REVERT,
  EDIT_DESCRIPTION_SUCCESS,
} from '../actions/actions-edit-experiment';

import {
  RUN_TRANSFORM_SUCCESS,
} from '../actions/actions-transforms';

const initialState = {
  items: {},
  isLoading: false,
  isPolling: false,
  isSaving: false,
  error: undefined,
  currentExperiment: undefined,
  edit: editInitialState,
  runningTransforms: {},
  remoteFiles: {},
};

// -----------------------------------------------------------------------------
// REDUCERS
// -----------------------------------------------------------------------------

const allExperimentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPERIMENTS_REQUEST: {
      return utils.updateObject(
        state, { isLoading: true, error: undefined }
      );
    }
    case LOAD_EXPERIMENTS_SUCCESS: {
      return utils.updateObject(
        state, { isLoading: false, items: action.payload }
      );
    }
    case LOAD_EXPERIMENTS_FAILURE: {
      return utils.updateObject(
        state, { isLoading: false, error: action.payload }
      );
    }
    default:
      return state;
  }
};

const singleExperimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPERIMENT_REQUEST: {
      return utils.updateObject(
        state, { isLoading: true, error: undefined }
      );
    }
    case POLL_EXPERIMENT_REQUEST: {
      return utils.updateObject(
        state, { isPolling: true, error: undefined }
      );
    }
    case LOAD_EXPERIMENT_SUCCESS: {
      const experiment = action.payload;
      const { id } = experiment;

      // Update the running transforms
      const finishedTransformId = _.keys(state.runningTransforms).filter(
        transformId => experiment.transforms[transformId]
      );
      const runningTransforms = _.omit(state.runningTransforms, finishedTransformId);
      return {
        ...state,
        isLoading: false,
        currentExperiment: id,
        items: { ...state.items, [id]: experiment },
        runningTransforms,
      };
    }
    case POLL_EXPERIMENT_SUCCESS: {
      const experiment = action.payload;
      const { id } = experiment;

      // Update the running transforms
      const finishedTransformId = _.keys(state.runningTransforms).filter(
        transformId => experiment.transforms[transformId]
      );
      const runningTransforms = _.omit(state.runningTransforms, finishedTransformId);
      return {
        ...state,
        isPolling: false,
        currentExperiment: id,
        items: { ...state.items, [id]: experiment },
        runningTransforms,
      };
    }
    case LOAD_EXPERIMENT_FAILURE: {
      return utils.updateObject(
        state, { isLoading: false, error: action.payload }
      );
    }
    case POLL_EXPERIMENT_FAILURE: {
      return utils.updateObject(
        state, { isPolling: false, error: action.payload }
      );
    }
    default: {
      return state;
    }
  }
};


const createExperimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXPERIMENT_REQUEST: {
      return utils.updateObject(
        state, { isSaving: true, error: undefined }
      );
    }
    case CREATE_EXPERIMENT_SUCCESS: {
      return utils.updateObject(
        state, { isSaving: false, error: undefined }
      );
    }
    case CREATE_EXPERIMENT_FAILURE: {
      return utils.updateObject(
        state, { isSaving: false, error: action.payload }
      );
    }
    default:
      return state;
  }
};

const deleteExperimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EXPERIMENT_REQUEST: {
      return utils.updateObject(
        state, { isSaving: true, error: undefined }
      );
    }
    case DELETE_EXPERIMENT_SUCCESS: {
      const items = _.omit(state.items, action.payload);
      return utils.updateObject(
        state, { isSaving: false, error: undefined, items }
      );
    }
    case DELETE_EXPERIMENT_FAILURE: {
      return utils.updateObject(
        state, { isSaving: false, error: action.payload }
      );
    }
    default:
      return state;
  }
};


const cloneExperimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLONE_EXPERIMENT_REQUEST: {
      return utils.updateObject(
        state, { isSaving: true, error: undefined }
      );
    }
    case CLONE_EXPERIMENT_SUCCESS: {
      return utils.updateObject(
        state, { isSaving: false, error: undefined }
      );
    }
    case CLONE_EXPERIMENT_FAILURE: {
      return utils.updateObject(
        state, { isSaving: false, error: action.payload }
      );
    }
    default:
      return state;
  }
};
// -----------------------------------------------------------------------------
// PROPERTIES
// -----------------------------------------------------------------------------

const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EXPERIMENT_PROPERTY_REQUEST:
    case CREATE_EXPERIMENT_PROPERTY_REQUEST: {
      return utils.updateObject(
        state, { isSaving: true, error: undefined }
      );
    }
    case CREATE_EXPERIMENT_PROPERTY_SUCCESS: {
      const { experimentId, properties } = action.payload;

      // Update experiment
      const experiment = state.items[experimentId];
      if (experiment) {
        _.values(properties).forEach((prop) => {
          experiment.addProperty(prop.name, prop.value);
        });
      }

      return {
        ...state,
        items: {
          ...state.items,
          [experiment.id]: experiment,
        },
        isSaving: false,
        error: undefined,
      };
    }
    case DELETE_EXPERIMENT_PROPERTY_SUCCESS: {
      const { experimentId, propertyName } = action.payload;
      // Update experiment
      const experiment = state.items[experimentId];
      if (experiment) {
        experiment.removeProperty(propertyName);
      }

      return {
        ...state,
        items: {
          ...state.items,
          [experiment.id]: experiment,
        },
        isSaving: false,
        error: undefined,
      };
    }
    case DELETE_EXPERIMENT_PROPERTY_FAILURE:
    case CREATE_EXPERIMENT_PROPERTY_FAILURE: {
      return utils.updateObject(
        state, {
          isSaving: false,
          error: action.payload,
        }
      );
    }

    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// UPLOAD FILE REDUCER
// -----------------------------------------------------------------------------
const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
    case DELETE_FILE_REQUEST: {
      return utils.updateObject(
        state, { isSaving: true, error: undefined }
      );
    }
    case UPLOAD_FILE_SUCCESS: {
      const { experimentId, file } = action.payload;
      const currentExperiment = state.items[experimentId];
      if (currentExperiment) {
        currentExperiment.addDataFile(file.type, file.folder, file.name, file.size);
      }
      return {
        ...state,
        items: {
          ...state.items,
          [currentExperiment.id]: currentExperiment,
        },
        isSaving: false,
        error: undefined,
      };
    }
    case DELETE_FILE_SUCCESS: {
      const { experimentId, file } = action.payload;
      const experiment = state.items[experimentId];
      if (experiment) {
        experiment.removeFile(file);
      }
      return {
        ...state,
        items: {
          ...state.items,
          [experiment.id]: experiment,
        },
        isSaving: false,
        error: undefined,
      };
    }
    case UPLOAD_FILE_FAILURE:
    case DELETE_FILE_FAILURE: {
      return utils.updateObject(
        state, {
          isSaving: false,
          error: action.payload,
        }
      );
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// RUNNING TRANSFORMS REDUCER
// -----------------------------------------------------------------------------

const runningTransformsReducer = (state = initialState.runningTransforms, action) => {
  switch (action.type) {
    case RUN_TRANSFORM_SUCCESS: {
      const {
        experimentId,
        sourceTransformId,
        transform,
        dataTransformId,
      } = action.payload;

      const dataTransform = DataTransform.getRunningTransform(
        dataTransformId,
        experimentId,
        sourceTransformId,
        transform
      );

      return {
        ...state,
        [dataTransformId]: dataTransform,
      };
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// DESCRIPTION REDUCER
// -----------------------------------------------------------------------------

const descriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_DESCRIPTION_SUCCESS: {
      const { experimentId, description } = action.payload;
      const experiment = state.items[experimentId];

      if (experiment) {
        experiment.description = description;
      }
      return {
        ...state,
        items: {
          ...state.items,
          [experiment.id]: experiment,
        },
        isSaving: false,
        error: undefined,
      };
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// DESIGN REDUCER
// -----------------------------------------------------------------------------

const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DESIGN_REQUEST: {
      return {
        ...state,
        isSaving: true,
        error: undefined,
      };
    }
    case UPLOAD_DESIGN_SUCCESS: {
      const { experimentId, design } = action.payload;
      const experiment = state.items[experimentId];

      if (experiment) {
        experiment.design = design;
      }
      return {
        ...state,
        items: {
          ...state.items,
          [experiment.id]: experiment,
        },
        isSaving: false,
        error: undefined,
      };
    }
    case UPLOAD_DESIGN_FAILURE: {
      return {
        ...state,
        isSaving: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// REMOTE FILES REDUCER
// -----------------------------------------------------------------------------

const remoteFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENABLE_REMOTE_FILE_UPLOAD: {
      const { type, enable } = action.payload;
      return {
        ...state,
        [type]: {
          ...state[type],
          enabled: enable,
        },
      };
    }
    case LOAD_REMOTE_FILES_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case LOAD_REMOTE_FILES_SUCCESS: {
      const { type, dataSource, folder, files } = action.payload;
      const currentFolder = RemoteFile.from(dataSource, folder);
      return {
        ...state,
        isLoading: false,
        [type]: {
          ...state[type],
          currentFolder,
          files,
        },
      };
    }
    case LOAD_REMOTE_FILES_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

// -----------------------------------------------------------------------------
// COMBINE SINGLE PARTS
// -----------------------------------------------------------------------------

const experimentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPERIMENTS_REQUEST:
    case LOAD_EXPERIMENTS_SUCCESS:
    case LOAD_EXPERIMENTS_FAILURE: {
      return allExperimentsReducer(state, action);
    }
    case POLL_EXPERIMENT_REQUEST:
    case POLL_EXPERIMENT_SUCCESS:
    case POLL_EXPERIMENT_FAILURE:
    case LOAD_EXPERIMENT_REQUEST:
    case LOAD_EXPERIMENT_SUCCESS:
    case LOAD_EXPERIMENT_FAILURE: {
      return {
        ...singleExperimentReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case CREATE_EXPERIMENT_REQUEST:
    case CREATE_EXPERIMENT_SUCCESS:
    case CREATE_EXPERIMENT_FAILURE: {
      return {
        ...createExperimentReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case DELETE_EXPERIMENT_REQUEST:
    case DELETE_EXPERIMENT_SUCCESS:
    case DELETE_EXPERIMENT_FAILURE: {
      return {
        ...deleteExperimentReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case CLONE_EXPERIMENT_REQUEST:
    case CLONE_EXPERIMENT_SUCCESS:
    case CLONE_EXPERIMENT_FAILURE: {
      return {
        ...cloneExperimentReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case CREATE_EXPERIMENT_PROPERTY_REQUEST:
    case CREATE_EXPERIMENT_PROPERTY_SUCCESS:
    case CREATE_EXPERIMENT_PROPERTY_FAILURE:
    case DELETE_EXPERIMENT_PROPERTY_REQUEST:
    case DELETE_EXPERIMENT_PROPERTY_SUCCESS:
    case DELETE_EXPERIMENT_PROPERTY_FAILURE: {
      return {
        ...propertiesReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case UPLOAD_FILE_REQUEST:
    case UPLOAD_FILE_PROGRESS:
    case UPLOAD_FILE_SUCCESS:
    case UPLOAD_FILE_FAILURE:
    case DELETE_FILE_REQUEST:
    case DELETE_FILE_SUCCESS:
    case DELETE_FILE_FAILURE: {
      return {
        ...fileReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case ADD_NEW_PROPERTY:
    case REMOVE_NEW_PROPERTY:
    case UPDATE_NEW_PROPERTY:
    case CLEAR_NEW_PROPERTIES:
    case VALIDATE_NEW_PROPERTIES:
    case EDIT_DESCRIPTION_START:
    case EDIT_DESCRIPTION_CHANGE:
    case EDIT_DESCRIPTION_REVERT:
    case EDIT_DESCRIPTION_COMMIT:
      return { ...state, edit: editReducer(state.edit, action) };
    case EDIT_DESCRIPTION_SUCCESS: {
      return {
        ...descriptionReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case UPLOAD_DESIGN_REQUEST:
    case UPLOAD_DESIGN_SUCCESS:
    case UPLOAD_DESIGN_FAILURE: {
      return {
        ...designReducer(state, action),
        edit: editReducer(state.edit, action),
      };
    }
    case RUN_TRANSFORM_SUCCESS: {
      return {
        ...state,
        runningTransforms: runningTransformsReducer(state.runningTransforms, action),
      };
    }
    case ENABLE_REMOTE_FILE_UPLOAD:
    case LOAD_REMOTE_FILES_REQUEST:
    case LOAD_REMOTE_FILES_SUCCESS:
    case LOAD_REMOTE_FILES_FAILURE: {
      return {
        ...state,
        remoteFiles: remoteFilesReducer(state.remoteFiles, action),
      };
    }
    default:
      return { ...state };
  }
};

// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------

export const getMatchingExperiments = (state, query) => {
  if (query) {
    const lowerQuery = query.toLowerCase();
    const searchFields = ['title', 'description', 'type', 'user', 'organization'];
    const matches = (item) => {
      for (const field of searchFields) {
        if (item[field].toLowerCase().indexOf(lowerQuery) >= 0) {
          return true;
        }
      }
      return false;
    };

    const hits = _.values(state.items).filter(item => matches(item));
    return _.keyBy(hits, 'id');
  }
  return {};
};

export const getRecentExperiments = (state, limit) => {
  if (!limit) {
    return {};
  }
  const experiments = _.values(state.items).slice(0, limit);
  return _.keyBy(experiments, 'id');
};

export const getExperimentById = (state, id) => {
  if (!id) {
    return {};
  }
  const experiments = _.values(state.items).filter(e => e.id === id);
  if (experiments.length === 1) {
    return experiments[0];
  }
  return {};
};

export const getUserExperiments = (state, user, limit) => {
  if (!limit) {
    return {};
  }
  if (!user) {
    return {};
  }
  const experiments = _.values(state.items)
    .filter(experiment => experiment.user === user.username)
    .slice(0, limit);
  return _.keyBy(experiments, 'id');
};

export const getCurrentExperiment = state => state.items[state.currentExperiment];

export const isExperimentEditable = (state, user) => {
  const currentExperiment = getCurrentExperiment(state);
  if (!currentExperiment || !user) {
    return false;
  }
  return currentExperiment.isEditableByUser(user.username);
};

export const getDescriptionState = (state) => {
  let value = '';
  if (state.edit.description.edit) {
    value = state.edit.description.value;
  } else {
    const currentExperiment = getCurrentExperiment(state);
    if (currentExperiment) {
      value = currentExperiment.description;
    }
  }

  return {
    edit: state.edit.description.edit,
    value,
  };
};

export const getProperties = (state) => {
  let properties = {};
  const currentExperiment = getCurrentExperiment(state);
  if (currentExperiment) {
    const persistedProps =
      _.keys(currentExperiment.properties)
        .map(name =>
          ({
            id: name,
            name,
            value: currentExperiment.properties[name].value,
            persisted: true,
          })
        );
    properties = { ...properties, ..._.keyBy(persistedProps, 'id') };
  }

  properties = { ...properties, ...state.edit.properties };

  return properties;
};

export const getFiles = (state) => {
  let allFiles = {};
  const currentExperiment = getCurrentExperiment(state);
  if (currentExperiment) {
    allFiles = { ...currentExperiment.rawDataFiles, ...currentExperiment.metaDataFiles };
  }

  if (state.edit.upload) {
    allFiles = { ...allFiles, ...state.edit.upload };
  }
  return allFiles;
};

export const getTransforms = (state) => {
  const currentExperiment = getCurrentExperiment(state);
  if (currentExperiment) {
    const executedTransforms = currentExperiment.transforms;
    const runningTransformArray =
      _.values(state.runningTransforms)
        .filter(transform => transform.experimentId === state.currentExperiment);

    return {
      ...executedTransforms,
      ..._.keyBy(runningTransformArray, 'id'),
    };
  }

  return {};
};

export const getTransformsArtifacts = (state) => {
  const transforms = getTransforms(state);
  const transformArtifacts =
    _.flatten(_.values(transforms)
      .map(transform => transform.artifacts).map(o => _.values(o)));
  return _.keyBy(transformArtifacts, artifact => artifact.key);
};

export const getCurrentExperimentArtifacts = (state, artifacts) => {
  const currentExperiment = getCurrentExperiment(state);
  if (currentExperiment) {
    const publishedArtifacts = _.values(artifacts)
      .filter(artifact => artifact.experimentId === currentExperiment.id);
    return _.keyBy(publishedArtifacts, artifact => artifact.key);
  }
  return {};
};

export const getRemoteFileEnabledByType = (state) => {
  const types = _.keys(state.remoteFiles);
  const result = {};
  types.forEach((type) => {
    result[type] = state.remoteFiles[type] ? state.remoteFiles[type].enabled : false;
  });
  return result;
};

export const getRemoteFilesByType = (state) => {
  const types = _.keys(state.remoteFiles);
  const result = {};
  types.forEach((type) => {
    result[type] = state.remoteFiles[type];
  });
  return result;
};

export const getCurrentRemoteFolderByType = (state) => {
  const types = _.keys(state.remoteFiles);
  const result = {};
  types.forEach((type) => {
    result[type] = state.remoteFiles[type] ? state.remoteFiles[type].currentFolder : {};
  });
  return result;
};


export const isLoading = state => state.isLoading;

export const getPersistenceState = state => ({
  ...initialState,
  runningTransforms: state.runningTransforms,
});

// -----------------------------------------------------------------------------
// DEFAULT EXPORTS
// -----------------------------------------------------------------------------

export default experimentsReducer;
