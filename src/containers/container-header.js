import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actions-auth';

function renderAuthLink(props, className) {
  const { authInfo, logoutUser } = props;
  if (authInfo.user) {
    return (<Link to="/" onClick={logoutUser} className={className} >Logout {authInfo.user.username}</Link>);
  }
  return (<Link to="/login" className={className}>Login</Link>);
}

renderAuthLink.propTypes = {
  authInfo: React.PropTypes.object,
  logoutUser: React.PropTypes.func,
};

const Header = props => (
  <div className="header">
    <div className="header__logo">
      <Link className="header__logo-text" to="/">Arcite</Link>
    </div>
    <ul className="main-nav">
      <Link to="/" className="main-nav__item">Home</Link>
      <Link to="/experiments/create" className="main-nav__item">Create Experiment</Link>
      {renderAuthLink(props, 'main-nav__item main-nav__item--last')}
    </ul>
    <ul className="mobile-nav">
      <Link to="/" className="mobile-nav__item">Home</Link>
      <Link to="/experiments/create" className="mobile-nav__item">Create Experiment</Link>
      {renderAuthLink(props, 'mobile-nav__item mobile-nav__item--last')}
    </ul>
  </div>
);

function mapStateToProps(state) {
  return {
    authInfo: state.auth,
  };
}
export default connect(mapStateToProps, actions)(Header);
