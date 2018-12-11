import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as transformActions from '../actions/actions-transforms';
import * as organizationActions from '../actions/actions-organization';

import App from '../components/app';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.handleInit = this.handleInit.bind(this);
  }

  handleInit() {
    const { loadOrganization, loadTransforms } = this.props;
    loadOrganization();
    loadTransforms();
  }
  render() {
    const {
      children,
    } = this.props;
    return (
      <App init={this.handleInit} props={this.props}>
        {children}
      </App>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.node.isRequired,
  loadOrganization: React.PropTypes.func.isRequired,
  loadTransforms: React.PropTypes.func.isRequired,
};

export default connect(null, { ...transformActions, ...organizationActions })(AppContainer);
