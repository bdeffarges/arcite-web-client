import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getOrganization } from '../../reducers';

import { ExperimentCreationForm } from '../../components/experiment/experiment-create-form';

import Experiment from '../../model/experiment';

import * as actions from '../../actions/actions-experiments';

import hocAuthUser from '../hoc-auth-user';
import User from '../../model/user';

function handleCancel() {
  browserHistory.goBack();
}

const createTypeOptions = organization =>
  _.values(organization.experimentTypes)
    .map(experimentType => ({ value: experimentType.path, label: experimentType.description }));

class CreateExperimentContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { authUser, createExperiment } = this.props;
    const experiment =
      new Experiment();

    experiment.title = values.experimentName;
    experiment.description = values.description;
    experiment.type = Experiment.extractTypeFromPath(values.type);
    experiment.user = authUser.username;
    experiment.organization = Experiment.extractOrganizationFromPath(values.type);
    createExperiment(experiment).then((json) => {
      if (json.status === 201) {
        browserHistory.push(`/experiments/${json.data.uid}`);
      }
    });
  }

  render() {
    const { organization } = this.props;
    return (
      <ExperimentCreationForm
        options={createTypeOptions(organization)}
        onSubmit={this.handleSubmit}
        onCancel={handleCancel}
        {...this.props}
      />
    );
  }
}

CreateExperimentContainer.propTypes = {
  authUser: React.PropTypes.instanceOf(User),
  organization: React.PropTypes.object,
  createExperiment: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    organization: getOrganization(state),
    sendingRequest: state.experiments.isSaving,
    requestError: state.experiments.error,
  };
}

const connectedComp = connect(mapStateToProps, actions)(CreateExperimentContainer);

export default hocAuthUser(connectedComp);
