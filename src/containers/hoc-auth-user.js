import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    authUser: state.auth.user,
  };
}
export default connect(mapStateToProps);
