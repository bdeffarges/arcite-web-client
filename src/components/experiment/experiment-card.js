import React, { Component } from 'react';
import radium from 'radium';
import _ from 'lodash';

import { default as ExperimentModel } from '../../model/experiment';
import { default as ArtifactModel } from '../../model/artifact';

import ExperimentHeader from './experiment-header';
import ArtifactLinkBox from '../artifact/artifact-link-box';
import { Paper } from '../uikit/paper';
import { Heading3, Subheading4 } from '../uikit/typography';
import { DefaultButton } from '../uikit/buttons';
import { DefaultFAIcon } from '../uikit/icon';
import { HorizontalGrid, GridColumn } from '../uikit/grid';
import { IconConfirmationBox } from '../uikit/confirmation';

import styles from '../../styles';

// -----------------------------------------------------------------------------
// Action handling
// -----------------------------------------------------------------------------
function actionHandler(e, action) {
  if (action.needsConfirmation) {
    action.showConfirmation(e);
  } else {
    action.onClick(e);
  }
}

function getActionComponents(actions) {
  return actions.map(action => (
    <GridColumn space={0} key={action.name}>
      <DefaultButton onClick={e => actionHandler(e, action)}>{action.name}</DefaultButton>
    </GridColumn>
  ));
}

function renderArtifacts(artifacts) {
  return _.values(artifacts).map(artifact => (
    <li key={artifact.key}><ArtifactLinkBox artifact={artifact} /></li>
  ));
}

// -----------------------------------------------------------------------------
// Basic Experiment Card Component
// -----------------------------------------------------------------------------

class ExperimentCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      confirmationMessage: '',
      onConfirm: undefined,
    };
    this.handleShowConfirmation = this.handleShowConfirmation.bind(this);
    this.handleConfirmationAccept = this.handleConfirmationAccept.bind(this);
    this.handleConfirmationReject = this.handleConfirmationReject.bind(this);
  }

  handleConfirmationAccept() {
    this.state.onConfirm();
    const newState = { ...this.state, showConfirmation: false };
    this.setState(newState);
  }

  handleConfirmationReject() {
    const newState = { ...this.state, showConfirmation: false };
    this.setState(newState);
  }

  handleShowConfirmation(action) {
    const newState = {
      ...this.state,
      showConfirmation: true,
      confirmationMessage: action.confirmationMessage,
      onConfirm: action.onClick,
    };
    this.setState(newState);
  }

  render() {
    const {
      experiment,
      artifacts,
      m,
      actions = [],
    } = this.props;
    const sx = {
      container: {
        minWidth: '400px',
        borderLeft: `4px solid ${styles.variables.color.secondaryColor}`,
      },
      content: {
        ...styles.getPadding(2, 0),
        ...styles.getFontSize(6),
        ...styles.getLineHeight(6),
      },
      meta: {
        ...styles.getPadding(2, 0),
        ...styles.getFontSize(6),
        ...styles.getLineHeight(6),
      },
      results: {
        display: artifacts.length ? 'block' : 'none',
        ...styles.getMargin([0, 0, 0, 5]),
        list: {
          ...styles.getFontSize(6),
          listStyle: 'none',
        },
      },
      header: {
        borderBottom: `1px solid ${styles.shade[1]}`,
      },
      actions: {
        borderTop: `1px solid ${styles.shade[1]}`,
        // ...styles.getMarginTop(4),
        ...styles.getPaddingTop(2),
      },
    };

    const decoratedActions = actions.map((action) => {
      const showConfirmation = () => {
        this.handleShowConfirmation(action);
      };
      return { ...action, showConfirmation };
    });

    const actionComponents = getActionComponents(decoratedActions);

    return (
      <Paper {...this.props} style={sx.container} p={4} m={m} height="100%">
        <div style={sx.header}>
          <HorizontalGrid horizontalAlign="space-between">
            <GridColumn>
              <Heading3 m={0}>{experiment.title}</Heading3>
            </GridColumn>
            <GridColumn space={0}>
              <ExperimentHeader type={experiment.type} align="center" showLabel />
            </GridColumn>
          </HorizontalGrid>
          <Subheading4 m={0}>
            <DefaultFAIcon dimmed size={5} color="" icon="act-sitemap" width="25px" />
            {experiment.organization}
          </Subheading4>
          <Subheading4 m={0}>
            <DefaultFAIcon dimmed size={5} icon="act-user-2" width="25px" />
            {experiment.user}
          </Subheading4>
          <div style={sx.results}>
            <Subheading4 m={0}>
              Results
            </Subheading4>
            <ul style={sx.results.list}>
              {renderArtifacts(artifacts)}
            </ul>
          </div>
        </div>
        <div style={sx.content}>
          {experiment.description}
        </div>
        <div style={sx.meta}>
          {`Last update: ${experiment.lastUpdate}`}
        </div>

        <div style={sx.actions}>
          <HorizontalGrid horizontalAlign="flex-end">
            {actionComponents}
          </HorizontalGrid>
        </div>
        <IconConfirmationBox
          message="Delete experiment?"
          collapsed={!this.state.showConfirmation}
          onOk={this.handleConfirmationAccept}
          onCancel={this.handleConfirmationReject}
        />
      </Paper>
    );
  }
}

ExperimentCardComponent.propTypes = {
  experiment: React.PropTypes.instanceOf(ExperimentModel).isRequired,
  artifacts: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ArtifactModel)),
  m: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  actions: React.PropTypes.arrayOf(React.PropTypes.object),
};

const ExperimentCard = radium(ExperimentCardComponent);

export default ExperimentCard;
