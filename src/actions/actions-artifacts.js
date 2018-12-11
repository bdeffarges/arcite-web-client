import { artifacts as api } from '../api';

export const LOAD_GLOBAL_ARTIFACTS_REQUEST = 'transforms/load__global__artifacts__request';
export const LOAD_GLOBAL_ARTIFACTS_SUCCESS = 'transforms/load__global__artifacts__success';
export const LOAD_GLOBAL_ARTIFACTS_FAILURE = 'transforms/load__global__artifacts__failure';
export const LOAD_PUBLISHED_ARTIFACTS_REQUEST = 'transforms/load__publish__artifacts__request';
export const LOAD_PUBLISHED_ARTIFACTS_SUCCESS = 'transforms/load__publish__artifacts__success';
export const LOAD_PUBLISHED_ARTIFACTS_FAILURE = 'transforms/load__publish__artifacts__failure';
export const PUBLISH_ARTIFACT_REQUEST = 'transforms/publish__artifact__request';
export const PUBLISH_ARTIFACT_SUCCESS = 'transforms/publish__artifact__success';
export const PUBLISH_ARTIFACT_FAILURE = 'transforms/publish__artifact__failure';
export const UNPUBLISH_ARTIFACT_REQUEST = 'transforms/unpublish__artifact__request';
export const UNPUBLISH_ARTIFACT_SUCCESS = 'transforms/unpublish__artifact__success';
export const UNPUBLISH_ARTIFACT_FAILURE = 'transforms/unpublish__artifact__failure';

// -----------------------------------------------------------------------------
// LOAD GLOBAL ARTIFACTS
// -----------------------------------------------------------------------------
function requestLoadGlobalArtifacts() {
  return {
    type: LOAD_GLOBAL_ARTIFACTS_REQUEST,
  };
}

function successLoadGlobalArtifacts(artifacts) {
  return {
    type: LOAD_GLOBAL_ARTIFACTS_SUCCESS,
    payload: artifacts,
  };
}

function failureLoadGlobalArtifacts(json) {
  return {
    type: LOAD_GLOBAL_ARTIFACTS_FAILURE,
    payload: json.error,
  };
}

export function loadGlobalArtifacts(experimentId) {
  return (dispatch) => {
    dispatch(requestLoadGlobalArtifacts());
    const promise = api.loadGlobalArtifacts(experimentId);
    promise
      .then((artifacts) => {
        dispatch(successLoadGlobalArtifacts(artifacts));
      })
      .catch((err) => {
        dispatch(failureLoadGlobalArtifacts(err));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// LOAD ARTIFACTS
// -----------------------------------------------------------------------------
function requestLoadPublishedArtifacts() {
  return {
    type: LOAD_PUBLISHED_ARTIFACTS_REQUEST,
  };
}

function successLoadPublishedArtifacts(artifacts) {
  return {
    type: LOAD_PUBLISHED_ARTIFACTS_SUCCESS,
    payload: artifacts,
  };
}

function failureLoadPublishedArtifacts(json) {
  return {
    type: LOAD_PUBLISHED_ARTIFACTS_FAILURE,
    payload: json.error,
  };
}

export function loadPublishedArtifacts(experimentId) {
  return (dispatch) => {
    dispatch(requestLoadPublishedArtifacts());
    const promise = api.loadPublishedArtifacts(experimentId);
    promise
      .then((artifacts) => {
        dispatch(successLoadPublishedArtifacts(artifacts));
      })
      .catch((err) => {
        dispatch(failureLoadPublishedArtifacts(err));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// PUBLISH ARTIFACT
// -----------------------------------------------------------------------------

function requestPublishArtifact() {
  return {
    type: PUBLISH_ARTIFACT_REQUEST,
  };
}

function successPublishArtifact(artifact) {
  return {
    type: PUBLISH_ARTIFACT_SUCCESS,
    payload: artifact,
  };
}

function failurePublishArtifact(json) {
  return {
    type: PUBLISH_ARTIFACT_FAILURE,
    payload: json.error,
  };
}

export function publishArtifact(experimentId, transformId, description, artifact) {
  return (dispatch) => {
    dispatch(requestPublishArtifact());
    const publishPromise = api.publishArtifact(experimentId, transformId, description, artifact);
    publishPromise
      .then((publishedArtifact) => {
        dispatch(successPublishArtifact(publishedArtifact));
      })
      .catch((error) => {
        dispatch(failurePublishArtifact(error));
      });
    return publishPromise;
  };
}

export function publishArtifactGlobally(description, username, organization, artifact) {
  return (dispatch) => {
    dispatch(requestPublishArtifact());
    const publishPromise =
      api.publishArtifactGlobally(description, username, organization, artifact);
    publishPromise
      .then((publishedArtifact) => {
        dispatch(successPublishArtifact(publishedArtifact));
      })
      .catch((error) => {
        dispatch(failurePublishArtifact(error));
      });
    return publishPromise;
  };
}

// -----------------------------------------------------------------------------
// UNPUBLISH ARTIFACT
// -----------------------------------------------------------------------------

function requestUnpublishArtifact() {
  return {
    type: UNPUBLISH_ARTIFACT_REQUEST,
  };
}

function successUnpublishArtifact(artifactId) {
  return {
    type: UNPUBLISH_ARTIFACT_SUCCESS,
    payload: artifactId,
  };
}

function failureUnpublishArtifact(json) {
  return {
    type: UNPUBLISH_ARTIFACT_FAILURE,
    payload: json.error,
  };
}

export function unpublishArtifact(experimentId, artifact) {
  return (dispatch) => {
    dispatch(requestUnpublishArtifact());
    const promise = api.unpublishArtifact(experimentId, artifact.id);
    promise
      .then(() => {
        dispatch(successUnpublishArtifact(artifact.key));
      })
      .catch((err) => {
        dispatch(failureUnpublishArtifact(err));
      });
    return promise;
  };
}

// -----------------------------------------------------------------------------
// DEFAULT EXPORT
// -----------------------------------------------------------------------------


export default {
  loadGlobalArtifacts,
  loadPublishedArtifacts,
  publishArtifact,
  publishArtifactGlobally,
  unpublishArtifact,
};
