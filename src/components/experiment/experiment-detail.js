import React, { Component } from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import DataTransform from '../../model/data-transform';
import Experiment from '../../model/experiment';
import Transform from '../../model/transform';
import User from '../../model/user';

import { SecondarySection, Section, Container } from '../uikit/containers';
import Checkbox from '../uikit/checkbox';
import { Heading1, ThinHeading2, LeadText, Subheading4 } from '../uikit/typography';
import { DefaultFAIcon } from '../uikit/icon';
import ExperimentHeader from './experiment-header';
import PropertyTable from '../property/property-table';
import FileGrid from '../../containers/experiment/container-file-grid';
import DesignView from '../design/design-view';
import DesignEditor from '../design/design-editor';
import { TextArea } from '../uikit/input';
import { Editable } from '../uikit/editable';
import { ActionBar } from '../uikit/action-bar';
import { Action } from '../uikit/action-bar-action';
import TransformView from '../transform/transform-view';

import styles from '../../styles';

function renderDescription(description) {
  if (description.editable) {
    return (
      <Editable
        isEdit={description.edit}
        onEditStart={description.startEditDescription}
        onEditRevert={description.revertEditDescription}
        onEditCommit={description.commitEditDescription}
      >
        <LeadText>{description.value}</LeadText>
        <TextArea
          rows={10}
          size="large"
          value={description.value}
          onChange={(e) => {
            description.descriptionChanged(e.target.value);
          }}
          name="editDescription"
        />
      </Editable>
    );
  }
  return (<LeadText>{description.value}</LeadText>);
}

function renderDesign(data) {
  if (data.design && data.design.samples && data.design.samples.length) {
    return (
      <DesignView
        design={data.design}
        colorBy={data.colorSamplesBy}
        sortBy={data.sortSamplesBy}
        onSortBy={data.onSortBy}
        onColorBy={data.onColorBy}
        onClear={data.clearDesign}
      />
    );
  }

  if (data.editable) {
    return (
      <DesignEditor
        mode={data.designEditorMode}
        design={data.design}
        setDesignEditorMode={data.setDesignEditorMode}
        uploadDesign={data.uploadDesign}
      />
    );
  }

  return (
    <LeadText>
      For this experiment there is no design available.
    </LeadText>
  );
}

function createAction({ name, icon, onAction, confirmation }) {
  return (
    <Action
      key={name}
      name={name}
      icon={icon}
      onAction={onAction}
      confirmation={confirmation}
    />
  );
}

createAction.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  onAction: PropTypes.func,
  confirmation: PropTypes.object,
};

class ExperimentDetailComponent extends Component {

  constructor(props) {
    super(props);

    this.handleApply = this.handleApply.bind(this);
    this.handlePublishArtifact = this.handlePublishArtifact.bind(this);
    this.handleUnpublishArtifact = this.handleUnpublishArtifact.bind(this);
    this.renderActionBar = this.renderActionBar.bind(this);
  }

  handleApply() {
    const { experiment, addTransform, nextTransform, currentDataTransform } = this.props;
    const experimentId = experiment.id;
    const sourceTransformId = currentDataTransform.name === 'Raw Data' ? undefined : currentDataTransform.id;
    addTransform(experimentId, sourceTransformId, nextTransform);
  }

  handlePublishArtifact(artifact, comment, globally) {
    if (!globally) {
      const { experiment, publishArtifact, currentDataTransform } = this.props;
      const experimentId = experiment.id;
      const transformId = currentDataTransform.id;
      publishArtifact(experimentId, transformId, comment, artifact.artifact);
    } else {
      const { publishArtifactGlobally, user } = this.props;
      publishArtifactGlobally(comment, user.username, user.organization, artifact.artifact);
    }
  }

  handleUnpublishArtifact(artifact) {
    const { experiment, unpublishArtifact } = this.props;
    const experimentId = experiment.id;
    unpublishArtifact(experimentId, artifact);
  }

  renderActionBar() {
    const { experiment: { id }, editable, cloneExperiment, deleteExperiment } = this.props;
    const actions = [];
    // Clone action
    actions.push({
      name: 'Clone',
      icon: 'act-clone',
      onAction: () => cloneExperiment(id),
      confirmation: {
        message: 'Clone experiment?',
      },
    });

    if (editable) {
      actions.push({
        name: 'Delete',
        icon: 'act-trash',
        onAction: () => deleteExperiment(id),
        confirmation: {
          message: 'Delete experiment?',
        },
      });
    }

    return (
      <ActionBar invert>
        {actions.map(action => createAction(action))}
      </ActionBar>
    );
  }

  render() {
    const {
      experiment,
      artifacts,
      description,
      properties,
      transforms,
      designEditorMode,
      editable,
      colorSamplesBy,
      sortSamplesBy,
      currentDataTransform,
      possibleNextTransforms,
      nextTransform,
      hideFailedTransforms,
      startEditDescription,
      descriptionChanged,
      revertEditDescription,
      commitEditDescription,
      setDesignEditorMode,
      addNewProperty,
      removeNewProperty,
      updateNewProperty,
      clearNewProperties,
      addPropertiesToExperiment,
      uploadDesign,
      removePropertyFromExperiment,
      onColorBy,
      onSortBy,
      clearDesign,
      selectDataTransform,
      selectNextTransform,
      toggleHideFailedTransforms,
    } = this.props;
    const sx = {
      header: {
        checkBox: {
          float: 'right',
          marginTop: '-3.5rem',
          '@media (max-width: 34rem)': {
            float: 'none',
            margin: 0,
          },
        },
      },

      title: {
        borderTop: '1px solid white',
        borderBottom: '1px solid white',
        backgroundColor: styles.alpha(styles.variables.type.baseBackgroundColor)(1 / 8),
      },

      actionbar: {
        ...styles.getMargin([30, 'auto']),
        ...styles.getScaledProperty('width')(100),
      },
    };
    if (!experiment) {
      return (<div />);
    }

    return (
      <div style={sx.container}>
        <SecondarySection>
          <ExperimentHeader size={0} align="center" type={experiment.type} showLabel color="white" />
          <Heading1 p={[8, 0]} m={[4, 0]} center caps style={sx.title}>{experiment.title}</Heading1>
          <Subheading4 m={0} center invert>
            <DefaultFAIcon dimmed size={5} color="white" icon="act-sitemap" width="25px" />
            {experiment.organization}
          </Subheading4>
          <Subheading4 m={0} center invert>
            <DefaultFAIcon dimmed size={5} color="white" icon="act-user-2" width="25px" />
            {experiment.user}
          </Subheading4>
          <div style={sx.actionbar}>
            {this.renderActionBar()}
          </div>
        </SecondarySection>
        <Section>
          <Container>
            <ThinHeading2 underline>Description</ThinHeading2>
            {renderDescription({
              ...description,
              editable,
              startEditDescription,
              descriptionChanged,
              revertEditDescription,
              commitEditDescription: () => commitEditDescription(experiment.id, description.value),
            })}
          </Container>
        </Section>
        <SecondarySection>
          <Container>
            <ThinHeading2 invert underline>Files</ThinHeading2>
            <FileGrid />
          </Container>
        </SecondarySection>
        <Section>
          <Container>
            <ThinHeading2 underline>Experimental Design</ThinHeading2>
            {renderDesign({
              design: experiment.design,
              designEditorMode,
              colorSamplesBy,
              sortSamplesBy,
              onSortBy,
              onColorBy,
              clearDesign,
              setDesignEditorMode,
              editable,
              uploadDesign: design => uploadDesign(experiment.id, design),
            })}
          </Container>
        </Section>
        <SecondarySection>
          <Container>
            <ThinHeading2 invert underline>Experiment Properties</ThinHeading2>
            <PropertyTable
              properties={properties}
              addNewProperty={addNewProperty}
              removeNewProperty={removeNewProperty}
              updateNewProperty={updateNewProperty}
              clearNewProperties={clearNewProperties}
              addPropertiesToExperiment={
                () => addPropertiesToExperiment(experiment.id, properties)
              }
              removePropertyFromExperiment={
                name => removePropertyFromExperiment(experiment.id, name)
              }
              editable={editable}
              invert
            />
          </Container>
        </SecondarySection>
        <Section>
          <Container style={sx.header}>
            <div>
              <ThinHeading2 underline style={sx.header.text}>
                Transformations
              </ThinHeading2>
              <div style={sx.header.checkBox}>
                <Checkbox
                  checked={hideFailedTransforms}
                  onChange={toggleHideFailedTransforms}
                >
                  Hide failed transforms
                </Checkbox>
              </div>
            </div>
            <div style={sx.clear} />
            <TransformView
              transforms={transforms}
              artifacts={experiment.filterArtifacts(artifacts)}
              selectedTransform={currentDataTransform}
              possibleNextTransforms={possibleNextTransforms}
              nextTransform={nextTransform}
              onSelectCurrent={selectDataTransform}
              onSelectNext={selectNextTransform}
              onApply={this.handleApply}
              onPublish={this.handlePublishArtifact}
              onUnpublish={this.handleUnpublishArtifact}
              editable={editable}
              hideFailedTransforms={hideFailedTransforms}
            />
          </Container>
        </Section>
      </div>
    );
  }
}

ExperimentDetailComponent.propTypes = {
  user: PropTypes.instanceOf(User),
  experiment: PropTypes.instanceOf(Experiment),
  artifacts: PropTypes.object,
  description: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  transforms: PropTypes.object.isRequired,
  designEditorMode: PropTypes.string,
  editable: PropTypes.bool,
  colorSamplesBy: PropTypes.string,
  sortSamplesBy: PropTypes.string,
  currentDataTransform: PropTypes.instanceOf(DataTransform),
  possibleNextTransforms: PropTypes.object,
  nextTransform: PropTypes.instanceOf(Transform),
  hideFailedTransforms: PropTypes.bool,
  cloneExperiment: PropTypes.func.isRequired,
  deleteExperiment: PropTypes.func.isRequired,
  startEditDescription: PropTypes.func.isRequired,
  descriptionChanged: PropTypes.func.isRequired,
  revertEditDescription: PropTypes.func.isRequired,
  commitEditDescription: PropTypes.func.isRequired,
  setDesignEditorMode: PropTypes.func.isRequired,
  addNewProperty: PropTypes.func.isRequired,
  removeNewProperty: PropTypes.func.isRequired,
  updateNewProperty: PropTypes.func.isRequired,
  clearNewProperties: PropTypes.func.isRequired,
  addPropertiesToExperiment: PropTypes.func.isRequired,
  uploadDesign: PropTypes.func.isRequired,
  removePropertyFromExperiment: PropTypes.func.isRequired,
  onColorBy: PropTypes.func.isRequired,
  onSortBy: PropTypes.func.isRequired,
  clearDesign: PropTypes.func.isRequired,
  selectDataTransform: PropTypes.func,
  selectNextTransform: PropTypes.func,
  addTransform: PropTypes.func,
  toggleHideFailedTransforms: PropTypes.func,
  publishArtifact: PropTypes.func.isRequired,
  publishArtifactGlobally: PropTypes.func.isRequired,
  unpublishArtifact: PropTypes.func.isRequired,
};

const ExperimentDetail = radium(ExperimentDetailComponent);

export default ExperimentDetail;
