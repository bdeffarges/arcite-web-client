import React from 'react';
import _ from 'lodash';
import ExperimentListItem from './experiment-list-item';

function renderListItems(experiments, onClick) {
  return _.values(experiments).map(
    experiment => (
      <ExperimentListItem
        key={experiment.id}
        experiment={experiment}
        onClick={() => onClick(experiment.id)}
      />
    )
  );
}
const ExperimentList = ({ experiments, onClick }) => (
  <ul>
    {renderListItems(experiments, onClick)}
  </ul>
);

ExperimentList.propTypes = {
  experiments: React.PropTypes.object,
  onClick: React.PropTypes.func,
};

export default ExperimentList;
