import React from 'react';
import _ from 'lodash';
import ExperimentCard from './experiment-card';
import { HorizontalGrid, GridColumn } from '../uikit/grid';

import User from '../../model/user';

function createActions(experiment, authUser, showExperiment, deleteExperiment) {
  const actions = [];
  if (authUser && experiment.isEditableByUser(authUser.username)) {
    actions.push({
      name: 'Delete',
      needsConfirmation: true,
      confirmationMessage: 'Delete experiment?',
      onClick: () => deleteExperiment(experiment.id),
    });
  }
  actions.push({
    name: 'View details',
    onClick: () => showExperiment(experiment.id),
  });
  return actions;
}


function renderExperimentItems(experiments, artifacts, authUser, showExperiment, deleteExperiment) {
  return _.map(
    experiments,
    experiment => (
      <GridColumn key={experiment.id} gutter={6}>
        <ExperimentCard
          actions={createActions(experiment, authUser, showExperiment, deleteExperiment)}
          experiment={experiment}
          artifacts={experiment.filterArtifacts(artifacts)}
          m={0}
        />
      </GridColumn>
    )
  );
}

const ExperimentCardGrid = ({
  experiments = {},
  artifacts = {},
  authUser,
  showExperiment,
  deleteExperiment,
}) => (
  <HorizontalGrid gutter={6}>
    { renderExperimentItems(experiments, artifacts, authUser, showExperiment, deleteExperiment) }
  </HorizontalGrid>
);

ExperimentCardGrid.propTypes = {
  experiments: React.PropTypes.object,
  artifacts: React.PropTypes.object,
  authUser: React.PropTypes.instanceOf(User),
  showExperiment: React.PropTypes.func.isRequired,
  deleteExperiment: React.PropTypes.func.isRequired,
};

export default ExperimentCardGrid;
