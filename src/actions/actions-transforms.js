import _ from 'lodash';
import { transforms as api } from '../api';
import Logger from '../logger';

export const LOAD_TRANSFORMS_REQUEST = 'transforms/fetch__request';
export const LOAD_TRANSFORMS_SUCCESS = 'transforms/fetch__success';
export const LOAD_TRANSFORMS_FAILURE = 'transforms/fetch__failure';
export const SELECT_DATA_TRANSFORM = 'transforms/select__data__transform';
export const SELECT_NEXT_TRANSFORM = 'transforms/select__next__transform';
export const RUN_TRANSFORM_REQUEST = 'transforms/run__new__request';
export const RUN_TRANSFORM_SUCCESS = 'transforms/run__new__success';
export const RUN_TRANSFORM_FAILURE = 'transforms/run__new__failure';
export const ADD_RUNNING_TRANSFORM = 'transforms/add__running__transform';
export const REMOVE_RUNNING_TRANSFORM = 'transforms/remove__running__transform';
export const TOGGLE_HIDE_FAILED_TRANSFORMS = 'transforms/toggle__hide__failed';

// -----------------------------------------------------------------------------
// LOAD TRANSFORMS
// -----------------------------------------------------------------------------

function findDependsOn(transform, transforms) {
  const idx = _.findIndex(
    transforms,
    t => t.name === transform.dependsOnName
    && t.organization === transform.dependsOnOrganization
  );
  if (idx > -1) {
    return transforms[idx];
  }
  return undefined;
}

function requestTransforms() {
  return {
    type: LOAD_TRANSFORMS_REQUEST,
  };
}

function successTransforms(json) {
  const { data } = json;

  // Resolve the dependsOn
  data.map((transform) => {
    const result = transform;
    const dependsOnTransform = findDependsOn(result, data);
    if (dependsOnTransform) {
      result.dependsOn = dependsOnTransform.id;
    }
    return result;
  });

  // Key by ID
  const mappedTransforms = _.keyBy(data, 'id');

  return {
    type: LOAD_TRANSFORMS_SUCCESS,
    payload: mappedTransforms,
  };
}

function failureTransforms(json) {
  return {
    type: LOAD_TRANSFORMS_FAILURE,
    payload: json.error,
  };
}

export function loadTransforms() {
  return (dispatch) => {
    dispatch(requestTransforms());
    const loadPromise = api.loadTransforms();
    loadPromise.then((response) => {
      dispatch(successTransforms(response));
    })
      .catch((error) => {
        dispatch(failureTransforms(error));
      });
    return loadPromise;
  };
}

// -----------------------------------------------------------------------------
// SELECT EXISTING TRANSFORM IN UI
// -----------------------------------------------------------------------------

export function selectDataTransform(id) {
  return {
    type: SELECT_DATA_TRANSFORM,
    payload: id,
  };
}

// -----------------------------------------------------------------------------
// SELECT NEXT TRANSFORM TO APPLY
// -----------------------------------------------------------------------------

export function selectNextTransform(id) {
  return {
    type: SELECT_NEXT_TRANSFORM,
    payload: id,
  };
}

// -----------------------------------------------------------------------------
// ADD NEW TRANSFORM
// -----------------------------------------------------------------------------

function requestRunTransform() {
  return {
    type: RUN_TRANSFORM_REQUEST,
  };
}

function successRunTransform(experimentId, sourceTransformId, transform, dataTransformId) {
  return {
    type: RUN_TRANSFORM_SUCCESS,
    payload: {
      experimentId,
      sourceTransformId: sourceTransformId || experimentId,
      transform,
      dataTransformId,
    },
  };
}

function failureRunTransform(json) {
  return {
    type: RUN_TRANSFORM_FAILURE,
    payload: json.error,
  };
}

export function runTransform(experimentId, sourceTransformId, transform) {
  return (dispatch) => {
    dispatch(requestRunTransform());

    const executePromise = api.runTransform(experimentId, sourceTransformId, transform);
    executePromise.then((response) => {
      const { data: { transfUID } } = response;
      dispatch(successRunTransform(experimentId, sourceTransformId, transform, transfUID));
      dispatch(selectDataTransform(transfUID));
      dispatch(selectNextTransform());
    })
      .catch((error) => {
        Logger.severe(error);
        dispatch(failureRunTransform(error));
      });

    return executePromise;
  };
}

// -----------------------------------------------------------------------------
// TOGGLE HIDE FAILED TRANSFORMS
// -----------------------------------------------------------------------------
export function toggleHideFailedTransforms() {
  return {
    type: TOGGLE_HIDE_FAILED_TRANSFORMS,
  };
}
