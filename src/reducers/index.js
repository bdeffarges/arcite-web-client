import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import auth, * as fromAuth from './reducer-auth';
import experiments, * as fromExperiments from './reducer-experiments';
import transforms, * as fromTransforms from './reducer-transforms';
import artifacts, * as fromArtifacts from './reducer-artifacts';
import organization, * as fromOrganization from './reducer-organization';
import ui, * as fromUI from './reducer-ui';

const rootReducer = combineReducers({
  auth,
  experiments,
  transforms,
  artifacts,
  organization,
  ui,
  form,
  routing,
});

export default rootReducer;
// -----------------------------------------------------------------------------
// FORM SELECTORS
// -----------------------------------------------------------------------------
export const getFormValue = (state, formName, valueName) => {
  if (
    state.form[formName]
    && state.form[formName].values
    && state.form[formName].values[valueName]
  ) {
    return state.form[formName].values[valueName];
  }
  return undefined;
};

// -----------------------------------------------------------------------------
// UI SELECTORS
// -----------------------------------------------------------------------------
export const getExperimentQuery = state =>
  fromUI.getExperimentQuery(state.ui);

export const getColorSamplesBy = state =>
  fromUI.getColorSamplesBy(state.ui);

export const getSortSamplesBy = state =>
  fromUI.getSortSamplesBy(state.ui);

export const getDesignEditorMode = state =>
  fromUI.getDesignEditorMode(state.ui);

// -----------------------------------------------------------------------------
// ARTIFACTS SELECTORS
// -----------------------------------------------------------------------------
export const getRecentGlobalArtifacts = (state, limit = 5) =>
  fromArtifacts.getRecentGlobalArtifacts(state.artifacts, limit);

export const getPublishedArtifacts = state => fromArtifacts.getPublishedArtifacts(state.artifacts);

// -----------------------------------------------------------------------------
// EXPERIMENT SELECTORS
// -----------------------------------------------------------------------------
export const getMatchingExperiments = state =>
  fromExperiments.getMatchingExperiments(state.experiments, getExperimentQuery(state));

export const getRecentExperiments = (state, limit = 5) =>
  fromExperiments.getRecentExperiments(state.experiments, limit);

export const getExperimentById = (state, id) =>
  fromExperiments.getExperimentById(state.experiments, id);

export const getUserExperiments = (state, limit = 5) =>
  fromExperiments.getUserExperiments(state.experiments, state.auth.user, limit);

export const isExperimentEditable = state =>
  fromExperiments.isExperimentEditable(state.experiments, state.auth.user);

export const getCurrentExperiment = state =>
  fromExperiments.getCurrentExperiment(state.experiments);

export const getDescriptionState = state =>
  fromExperiments.getDescriptionState(state.experiments);

export const getProperties = state =>
  fromExperiments.getProperties(state.experiments);

export const getFiles = state =>
  fromExperiments.getFiles(state.experiments);

export const getExperimentTransforms = state =>
  fromExperiments.getTransforms(state.experiments);

export const getExperimentTransformsArtifacts = state =>
  fromExperiments.getTransformsArtifacts(state.experiments);

export const getCurrentExperimentArtifacts = (state) => {
  const transformArtifacts = getExperimentTransformsArtifacts(state);
  const publishedArtifacts = fromExperiments.getCurrentExperimentArtifacts(
    state.experiments,
    getPublishedArtifacts(state)
  );

  return { ...transformArtifacts, ...publishedArtifacts };
};

// -----------------------------------------------------------------------------
// REMOTE FILES SELECTORS
// -----------------------------------------------------------------------------
export const getRemoteFileEnabledByType = state =>
  fromExperiments.getRemoteFileEnabledByType(state.experiments);

export const getRemoteFilesByType = state =>
  fromExperiments.getRemoteFilesByType(state.experiments);

export const getCurrentRemoteFolderByType = state =>
  fromExperiments.getCurrentRemoteFolderByType(state.experiments);

export const getExperimentsLoading = state =>
  fromExperiments.isLoading(state.experiments);

// -----------------------------------------------------------------------------
// TRANSFORMS SELECTORS
// -----------------------------------------------------------------------------

export const getAllTransforms = state =>
  fromTransforms.getAllTransforms(state.transforms);

export const getCurrentDataTransform = state =>
  fromTransforms.getCurrentDataTransform(state.transforms, getExperimentTransforms(state));

export const getPossibleNextTransforms = state =>
  fromTransforms.getPossibleNextTransforms(state.transforms, getCurrentDataTransform(state));

export const getNextTransform = (state) => {
  const transformId = getFormValue(state, 'transform-create', 'transform');
  if (transformId) {
    const transform = fromTransforms.getTransformById(state.transforms, transformId);
    transform.parameters.forEach((parameter) => {
      const value = getFormValue(state, 'transform-create', parameter.formKey);
      parameter.updateValue(value);
    });
    return transform;
  }
  return undefined;
};

export const getHideFailedTransforms = state =>
  fromTransforms.getHideFailedTransforms(state.transforms);

// -----------------------------------------------------------------------------
// AUTH SELECTORS
// -----------------------------------------------------------------------------
export const getUser = state => fromAuth.getUser(state);

// -----------------------------------------------------------------------------
// PERSISTENCE SELECTORS
// -----------------------------------------------------------------------------

export const getPersistenceState = state => ({
  auth: fromAuth.getPersistenceState(state.auth),
  experiments: fromExperiments.getPersistenceState(state.experiments),
  transforms: fromTransforms.getPersistenceState(state.transforms),
});

// -----------------------------------------------------------------------------
// ORGANIZATION SELECTORS
// -----------------------------------------------------------------------------
export const getOrganization = state => fromOrganization.getOrganization(state.organization);

// -----------------------------------------------------------------------------
// PROPERTIES SELECTORS
// -----------------------------------------------------------------------------
