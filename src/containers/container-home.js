import React from 'react';
import { connect } from 'react-redux';
import HomeComponent from '../components/home';
import * as actions from '../actions/actions-router';

const Home = ({ goTo }) => (
  <HomeComponent goTo={goTo} />
);

Home.propTypes = {
  goTo: React.PropTypes.func.isRequired,
};

export default connect(undefined, actions)(Home);
