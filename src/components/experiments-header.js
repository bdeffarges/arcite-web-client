import React from 'react';

const ExperimentHeader = ({ value }) => (
  <div className="experiment-header">
    <i className="experiment-list__icon experiment-list__icon--primary experiment-list__icon experiment-list__icon--large fi flaticon-chemical-utensils" />
    <div className="experiment-list__header experiment-list__header--primary">
      {value.name}
    </div>
  </div>
);

ExperimentHeader.propTypes = {
  value: React.PropTypes.object,
};

export default ExperimentHeader;
