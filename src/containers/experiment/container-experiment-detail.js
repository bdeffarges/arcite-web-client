import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as experimentActions from '../../actions/actions-experiments';
import * as transformActions from '../../actions/actions-transforms';
import * as artifactActions from '../../actions/actions-artifacts';
import * as editExperimentActions from '../../actions/actions-edit-experiment';
import * as uiActions from '../../actions/actions-ui';
import * as routerActions from '../../actions/actions-router';

import hocAuthUser from '../hoc-auth-user';

import Transform from '../../model/transform';
import DataTransform from '../../model/data-transform';
import Design from '../../model/design';

import Spinner from '../../components/spinner';

import {
  getExperimentsLoading,
  getCurrentExperiment,
  getCurrentExperimentArtifacts,
  getExperimentTransforms,
  isExperimentEditable,
  getDescriptionState,
  getProperties,
  getFiles,
  getColorSamplesBy,
  getSortSamplesBy,
  getDesignEditorMode,
  getCurrentDataTransform,
  getPossibleNextTransforms,
  getNextTransform,
  getHideFailedTransforms,
} from '../../reducers';

import ExperimentDetail from '../../components/experiment/experiment-detail';

class ExperimentDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.stopPolling = this.stopPolling.bind(this);
  }

  componentWillMount() {
    this.props.loadExperiment(this.props.params.uid);
    this.polling = setInterval(() => this.props.pollExperiment(this.props.params.uid), 15000);
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  stopPolling() {
    clearInterval(this.polling);
  }

  render() {
    const {
      loading,
      authUser,
      experiment,
      artifacts,
      description,
      properties,
      files,
      transforms,
      designEditorMode,
      samplesColoredBy,
      samplesSortedBy,
      editable,
      currentDataTransform,
      possibleNextTransforms,
      nextTransform,
      hideFailedTransforms,
      goTo,
      deleteExperiment,
      startEditDescription,
      descriptionChanged,
      revertEditDescription,
      commitEditDescription,
      uploadFile,
      deleteFile,
      addNewProperty,
      removeNewProperty,
      updateNewProperty,
      clearNewProperties,
      addPropertiesToExperiment,
      uploadDesign,
      removePropertyFromExperiment,
      colorSamplesBy,
      sortSamplesBy,
      setDesignEditorMode,
      selectDataTransform,
      selectNextTransform,
      addTransform,
      publishArtifact,
      publishArtifactGlobally,
      unpublishArtifact,
      toggleHideFailedTransforms,
    } = this.props;

    if (loading) {
      return (<Spinner />);
    }
    return (
      <ExperimentDetail
        user={authUser}
        experiment={experiment}
        artifacts={artifacts}
        description={description}
        properties={properties}
        files={files}
        transforms={transforms}
        startEditDescription={startEditDescription}
        descriptionChanged={descriptionChanged}
        revertEditDescription={revertEditDescription}
        commitEditDescription={commitEditDescription}
        uploadFile={uploadFile}
        deleteFile={deleteFile}
        addNewProperty={addNewProperty}
        updateNewProperty={updateNewProperty}
        removeNewProperty={removeNewProperty}
        clearNewProperties={clearNewProperties}
        designEditorMode={designEditorMode}
        colorSamplesBy={samplesColoredBy}
        sortSamplesBy={samplesSortedBy}
        onSortBy={sortSamplesBy}
        onColorBy={colorSamplesBy}
        clearDesign={() => uploadDesign(experiment.id, new Design(''))}
        setDesignEditorMode={setDesignEditorMode}
        addPropertiesToExperiment={addPropertiesToExperiment}
        uploadDesign={uploadDesign}
        removePropertyFromExperiment={removePropertyFromExperiment}
        currentDataTransform={currentDataTransform}
        possibleNextTransforms={possibleNextTransforms}
        nextTransform={nextTransform}
        hideFailedTransforms={hideFailedTransforms}
        selectDataTransform={selectDataTransform}
        selectNextTransform={selectNextTransform}
        addTransform={addTransform}
        toggleHideFailedTransforms={toggleHideFailedTransforms}
        publishArtifact={publishArtifact}
        publishArtifactGlobally={publishArtifactGlobally}
        unpublishArtifact={unpublishArtifact}
        cloneExperiment={id => goTo(`/experiments/clone/${id}`)}
        deleteExperiment={(id) => {
          this.stopPolling();
          deleteExperiment(id);
          goTo('/browse');
        }}
        editable={editable}
      />
    );
  }
}

ExperimentDetailContainer.propTypes = {
  loading: PropTypes.bool,
  authUser: PropTypes.object,
  experiment: PropTypes.object,
  artifacts: PropTypes.object,
  description: PropTypes.object.isRequired,
  properties: PropTypes.object,
  files: PropTypes.object,
  transforms: PropTypes.object,
  params: PropTypes.object,
  designEditorMode: PropTypes.string,
  samplesColoredBy: PropTypes.string,
  samplesSortedBy: PropTypes.string,
  editable: PropTypes.bool,
  currentDataTransform: PropTypes.instanceOf(DataTransform),
  possibleNextTransforms: PropTypes.object,
  nextTransform: PropTypes.instanceOf(Transform),
  hideFailedTransforms: PropTypes.bool,
  goTo: PropTypes.func.isRequired,
  deleteExperiment: PropTypes.func.isRequired,
  startEditDescription: PropTypes.func.isRequired,
  descriptionChanged: PropTypes.func.isRequired,
  revertEditDescription: PropTypes.func.isRequired,
  commitEditDescription: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  loadExperiment: PropTypes.func.isRequired,
  pollExperiment: PropTypes.func.isRequired,
  addNewProperty: PropTypes.func.isRequired,
  removeNewProperty: PropTypes.func.isRequired,
  updateNewProperty: PropTypes.func.isRequired,
  clearNewProperties: PropTypes.func.isRequired,
  addPropertiesToExperiment: PropTypes.func.isRequired,
  uploadDesign: PropTypes.func.isRequired,
  removePropertyFromExperiment: PropTypes.func.isRequired,
  colorSamplesBy: PropTypes.func.isRequired,
  sortSamplesBy: PropTypes.func.isRequired,
  setDesignEditorMode: PropTypes.func.isRequired,
  selectDataTransform: PropTypes.func.isRequired,
  selectNextTransform: PropTypes.func.isRequired,
  toggleHideFailedTransforms: PropTypes.func.isRequired,
  addTransform: PropTypes.func.isRequired,
  publishArtifact: PropTypes.func.isRequired,
  publishArtifactGlobally: PropTypes.func.isRequired,
  unpublishArtifact: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: getExperimentsLoading(state),
    experiment: getCurrentExperiment(state),
    artifacts: getCurrentExperimentArtifacts(state),
    description: getDescriptionState(state),
    properties: getProperties(state),
    files: getFiles(state),
    transforms: getExperimentTransforms(state),
    editable: isExperimentEditable(state),
    samplesColoredBy: getColorSamplesBy(state),
    samplesSortedBy: getSortSamplesBy(state),
    designEditorMode: getDesignEditorMode(state),
    currentDataTransform: getCurrentDataTransform(state),
    possibleNextTransforms: getPossibleNextTransforms(state),
    nextTransform: getNextTransform(state),
    hideFailedTransforms: getHideFailedTransforms(state),
  };
}

export default hocAuthUser(connect(
  mapStateToProps,
  {
    ...editExperimentActions,
    goTo: routerActions.goTo,
    deleteExperiment: experimentActions.deleteExperiment,
    uploadFile: experimentActions.uploadFile,
    deleteFile: experimentActions.deleteFile,
    removePropertyFromExperiment: experimentActions.deleteProperty,
    addPropertiesToExperiment: experimentActions.addProperties,
    uploadDesign: experimentActions.uploadDesign,
    loadExperiment: experimentActions.loadExperiment,
    pollExperiment: experimentActions.pollExperiment,
    sortSamplesBy: uiActions.sortSamplesBy,
    colorSamplesBy: uiActions.colorSamplesBy,
    setDesignEditorMode: uiActions.setDesignEditorMode,
    selectDataTransform: transformActions.selectDataTransform,
    selectNextTransform: transformActions.selectNextTransform,
    toggleHideFailedTransforms: transformActions.toggleHideFailedTransforms,
    addTransform: transformActions.runTransform,
    publishArtifact: artifactActions.publishArtifact,
    publishArtifactGlobally: artifactActions.publishArtifactGlobally,
    unpublishArtifact: artifactActions.unpublishArtifact,
  }
  )(ExperimentDetailContainer)
);
