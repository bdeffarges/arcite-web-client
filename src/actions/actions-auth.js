import { auth as api } from '../api';


export const AUTH_USER_REQUEST = 'users/auth__request';
export const AUTH_USER_SUCCESS = 'users/auth__success';
export const AUTH_USER_FAILURE = 'users/auth__failure';
export const UNAUTH_USER_REQUEST = 'users/unauth__request';
export const UNAUTH_USER_SUCCESS = 'users/unauth__success';
export const UNAUTH_USER_FAILURE = 'users/unauth__failure';

function requestAuthUser() {
  return {
    type: AUTH_USER_REQUEST,
  };
}

function successAuthUser(json) {
  return {
    type: AUTH_USER_SUCCESS,
    payload: json.data,
  };
}

function failureAuthUser(error) {
  return {
    type: AUTH_USER_FAILURE,
    payload: error,
  };
}

function requestUnauthUser() {
  return {
    type: UNAUTH_USER_REQUEST,
  };
}

function successUnauthUser() {
  return {
    type: UNAUTH_USER_SUCCESS,
  };
}

function failureUnauthUser(json) {
  return {
    type: UNAUTH_USER_FAILURE,
    payload: json.error,
  };
}

export function loginUser(credentials) {
  return (dispatch) => {
    dispatch(requestAuthUser());
    const authPromise = api.authUser(credentials);
    authPromise.then((response) => {
      dispatch(successAuthUser(response));
    })
    .catch((error) => {
      dispatch(failureAuthUser(error));
    });
    return authPromise;
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestUnauthUser());
    const unauthPromise = api.unauthUser();
    unauthPromise.then((response) => {
      dispatch(successUnauthUser(response));
    })
    .catch((error) => {
      dispatch(failureUnauthUser(error));
    });
    return unauthPromise;
  };
}
