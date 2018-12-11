import { AUTH_USER_REQUEST, AUTH_USER_SUCCESS, AUTH_USER_FAILURE, UNAUTH_USER_REQUEST, UNAUTH_USER_SUCCESS, UNAUTH_USER_FAILURE } from '../actions/actions-auth';
import * as utils from './reducer-utilities';

const initialState = {
  user: undefined,
  loggingIn: false,
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST: {
      return utils.updateObject(
        state,
        { loggingIn: true, error: undefined }
      );
    }
    case AUTH_USER_SUCCESS: {
      return utils.updateObject(
        state,
        { loggingIn: false, error: undefined, user: action.payload }
      );
    }
    case AUTH_USER_FAILURE: {
      return utils.updateObject(
        state,
        { loggingIn: false, error: action.payload }
      );
    }
    case UNAUTH_USER_REQUEST:
    case UNAUTH_USER_SUCCESS:
    case UNAUTH_USER_FAILURE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------

export const getPersistenceState = state => ({ user: state.user });
export const getUser = state => ({ user: state.user });
