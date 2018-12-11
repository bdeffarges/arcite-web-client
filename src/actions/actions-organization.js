import { organization as api } from '../api';

export const LOAD_ORGANIZATION_REQUEST = 'organization/fetch__request';
export const LOAD_ORGANIZATION_SUCCESS = 'organization/fetch__success';
export const LOAD_ORGANIZATION_FAILURE = 'organization/fetch__failure';

// -----------------------------------------------------------------------------
// LOAD TRANSFORMS
// -----------------------------------------------------------------------------
function requestOrganization() {
  return {
    type: LOAD_ORGANIZATION_REQUEST,
  };
}

function successOrganization(json) {
  const { data } = json;
  return {
    type: LOAD_ORGANIZATION_SUCCESS,
    payload: data,
  };
}

function failureOrganization(json) {
  return {
    type: LOAD_ORGANIZATION_FAILURE,
    payload: json.error,
  };
}

export function loadOrganization() {
  return (dispatch) => {
    dispatch(requestOrganization());
    const loadPromise = api.loadOrganization();
    loadPromise.then((response) => {
      dispatch(successOrganization(response));
    })
    .catch((error) => {
      dispatch(failureOrganization(error));
    });
    return loadPromise;
  };
}
