import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExperimentBrowser from '../../components/experiment/experiments-browse';
import Spinner from '../../components/spinner';
import * as experimentActions from '../../actions/actions-experiments';
import * as artifactActions from '../../actions/actions-artifacts';
import * as uiActions from '../../actions/actions-ui';
import { getMatchingExperiments, getRecentGlobalArtifacts, getRecentExperiments, getUserExperiments, getExperimentQuery, getPublishedArtifacts, getExperimentsLoading } from '../../reducers';

import hocAuthUser from '../hoc-auth-user';

class BrowseExperimentContainer extends Component {
  componentWillMount() {
    this.props.loadExperiments().then();
    this.props.loadGlobalArtifacts().then();
  }


  render() {
    if (this.props.loading) {
      return (<Spinner />);
    }
    return (
      <ExperimentBrowser {...this.props} />
    );
  }
}

BrowseExperimentContainer.propTypes = {
  loading: React.PropTypes.bool,
  loadExperiments: React.PropTypes.func.isRequired,
  loadGlobalArtifacts: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: getExperimentsLoading(state),
    experiments: getMatchingExperiments(state),
    artifacts: getPublishedArtifacts(state),
    recentExperiments: getRecentExperiments(state, 5),
    recentGlobalArtifacts: getRecentGlobalArtifacts(state, 20),
    userExperiments: getUserExperiments(state, 5),
    experimentsFilter: getExperimentQuery(state),
  };
}
export default hocAuthUser(
  connect(
    mapStateToProps,
    { ...experimentActions, ...artifactActions, ...uiActions }
  )(BrowseExperimentContainer)
);
