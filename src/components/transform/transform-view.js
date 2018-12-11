import React from 'react';
import radium from 'radium';
import _ from 'lodash';

import Transform from '../../model/transform';
import Artifact from '../../model/artifact';
import DataTransform from '../../model/data-transform';

import { TreeView } from '../treeview/treeview';
import TransformCardItem from './transform-card-item';
import TransformCreationForm from './transform-creation-form';

import styles from '../../styles';

import {
  RAW_DATA_DATA_TRANSFORM,
  RUNNING_DATA_TRANSFORM,
} from '../../constants';

function getNodeTypeFromTransform(transform) {
  if (transform.type === RAW_DATA_DATA_TRANSFORM) {
    return 5;
  }
  if (transform.status === 'RUNNING') {
    return 2;
  } else if (transform.status === 'FAILED') {
    return 0;
  }
  return 3;
}

const Spacer = ({
  transform,
}) => {
  if (transform) {
    const sx = {
      ...styles.getFontSize(0),
      ...styles.getMargin([4, 'auto']),
      textAlign: 'center',
    };
    return (
      <div style={sx}>
        <i className="act-arrow-down" />
      </div>
    );
  }
  return <i />;
};

Spacer.propTypes = {
  transform: React.PropTypes.instanceOf(DataTransform),
};

const DetailView = ({
  transform,
  artifacts,
  possibleTransforms,
  nextTransform,
  onApply,
  onPublish,
  onUnpublish,
}) => {
  const typeBaseColor = styles.variables.type.baseColor;
  const backgroundBase01 = styles.variables.color.primaryColor;
  const backgroundBase02 = styles.variables.color.secondaryColor;
  const sx = {
    container: {
      color: typeBaseColor,
    },
    block: {
      border: `1px solid ${styles.shade[1]}`,
      borderRadius: styles.variables.space.borderRadius,
      ...styles.getMargin([0, 0, 4, 0]),
    },
    heading: {
      color: styles.variables.type.baseBackgroundColor,
      backgroundColor: styles.darken(backgroundBase02, 2),
      ...styles.getFontSize(4),
      ...styles.getPadding(4),
      fontWeight: styles.variables.type.bold,
    },
    content: {
      ...styles.getPadding(4),
    },

    primary: {
      backgroundColor: styles.darken(backgroundBase01, 2),
    },
  };

  // Create initial values for form
  const selectables = transform && transform.selectables ? _.values(transform.selectables) : [];
  const selected = nextTransform ? nextTransform.id : undefined;

  const initialCreationFormValues = {
    transform: selected,
  };

  selectables.forEach((selectable) => {
    initialCreationFormValues[selectable.name] = true;
  });
  const transforms = _.values(possibleTransforms);
  const selectedTransform = _.find(transforms, { id: selected });

  if (selectedTransform && selectedTransform.parameters) {
    selectedTransform.parameters.forEach((parameter) => {
      initialCreationFormValues[`${parameter.formKey}`] = parameter.defaultValue;
    });
  }

  // Render
  return (
    <div style={sx.container}>
      <TransformCardItem
        transform={transform}
        artifacts={artifacts}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
      />
      <Spacer transform={transform} />
      <TransformCreationForm
        transforms={transforms}
        selectables={selectables}
        selected={selected}
        onApply={onApply}
        initialValues={initialCreationFormValues}
        enableReinitialize
      />
    </div>
  );
};

DetailView.propTypes = {
  transform: React.PropTypes.instanceOf(DataTransform),
  artifacts: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Artifact)),
  possibleTransforms: React.PropTypes.object,
  nextTransform: React.PropTypes.instanceOf(Transform),
  onApply: React.PropTypes.func.isRequired,
  onPublish: React.PropTypes.func.isRequired,
  onUnpublish: React.PropTypes.func.isRequired,

};

const TransformViewComponent = ({
  transforms,
  artifacts,
  selectedTransform,
  possibleNextTransforms,
  nextTransform,
  onSelectCurrent,
  onSelectNext,
  onApply,
  onPublish,
  onUnpublish,
  hideFailedTransforms,
}) => {
  const sx = {
    container: {
      display: 'flex',
      ...styles.getMargin([12, 0, 0, 0]),
    },
    column: {
      flex: 1,
      width: '100px',
      ...styles.getScaledProperty('minHeight')(100),
    },
  };
  const decoratedTransforms = _.values(transforms)
    .filter((transform) => {
      if (hideFailedTransforms) {
        return transform.status !== 'FAILED';
      }
      return true;
    })
    .map(
      transform => ({
        id: transform.id,
        parentId: transform.sourceTransformId,
        name: transform.name,
        selected: selectedTransform && transform.id === selectedTransform.id,
        dimmed: transform.type === RUNNING_DATA_TRANSFORM,
        nodeType: getNodeTypeFromTransform(transform),
      })
    );
  const filteredArtifacts =
    selectedTransform ?
      selectedTransform.filterArtifacts(artifacts)
      : [];

  return (
    <div style={sx.container}>
      <div style={sx.column}>
        <TreeView
          data={decoratedTransforms}
          resolveId={d => d.id}
          resolveParentId={d => d.parentId}
          onNodeSelect={onSelectCurrent}
        />

      </div>
      <div style={sx.column}>
        <DetailView
          transform={selectedTransform}
          artifacts={filteredArtifacts}
          possibleTransforms={possibleNextTransforms}
          nextTransform={nextTransform}
          onSelectNext={onSelectNext}
          onApply={onApply}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
        />
      </div>
    </div>
  );
};

TransformViewComponent.propTypes = {
  transforms: React.PropTypes.object,
  artifacts: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Artifact)),
  selectedTransform: React.PropTypes.instanceOf(DataTransform),
  possibleNextTransforms: React.PropTypes.object,
  nextTransform: React.PropTypes.instanceOf(Transform),
  onSelectCurrent: React.PropTypes.func,
  onSelectNext: React.PropTypes.func,
  onApply: React.PropTypes.func.isRequired,
  onPublish: React.PropTypes.func.isRequired,
  onUnpublish: React.PropTypes.func.isRequired,
  hideFailedTransforms: React.PropTypes.bool,
};

const TransformView = radium(TransformViewComponent);

export default TransformView;
