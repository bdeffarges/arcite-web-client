import React from 'react';
import Paper from 'material-ui/Paper';

const ExperimentListItem = ({ value, onClick }) => (
  <Paper className="experiment-list__item" onClick={onClick}>
    <i className="experiment-list__icon experiment-list__icon--primary experiment-list__icon experiment-list__icon--large fi flaticon-chemical-utensils" />
    <div className="experiment-list__header experiment-list__header--primary">
      {value.name}
    </div>
    <div className="experiment-list__item-body">
      <div className="experiment-list__item-body--right">
        <div className="experiment-list__header experiment-list__header--small">Author information</div>
        <div className="experiment-list__item-organization"><i className="experiment-list__icon experiment-list__icon--primary fa fa-building-o" /> {value.owner.organization}</div>
        <div className="experiment-list__item-user"><i className="experiment-list__icon experiment-list__icon--primary fa fa-user-circle-o" /> {value.owner.person}</div>
      </div>
      <div className="experiment-list__item-body--left">
        <div className="experiment-list__header experiment-list__header--small">Description</div>
        <div>
          {value.description}
        </div>
      </div>
    </div>
  </Paper>
);

ExperimentListItem.propTypes = {
  value: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func,
};

export default ExperimentListItem;
