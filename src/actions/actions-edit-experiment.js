import uuid from 'node-uuid';

import { experiments as api } from '../api';
import Logger from '../logger';

// -----------------------------------------------------------------------------
// EXPERIMENT DETAIL: ADD PROPERTY
// -----------------------------------------------------------------------------
export const ADD_NEW_PROPERTY = 'experiment/edit/add__new__property';
export const REMOVE_NEW_PROPERTY = 'experiment/edit/remove__new__property';
export const UPDATE_NEW_PROPERTY = 'experiment/edit/update__new__property';
export const CLEAR_NEW_PROPERTIES = 'experiment/edit/clear__new__properties';
export const VALIDATE_NEW_PROPERTIES = 'properties/validate__new__properties';
export const EDIT_DESCRIPTION_START = 'experiment/edit/start__edit__description';
export const EDIT_DESCRIPTION_CHANGE = 'experiment/edit/change__edit__description';
export const EDIT_DESCRIPTION_COMMIT = 'experiment/edit/commit__edit_description';
export const EDIT_DESCRIPTION_REVERT = 'experiment/edit/revert__edit_description';
export const EDIT_DESCRIPTION_SUCCESS = 'experiment/edit/success__edit_description';
// -----------------------------------------------------------------------------
// PRIVATE ACTIONS
// -----------------------------------------------------------------------------


function internalValidateProperties() {
  return {
    type: VALIDATE_NEW_PROPERTIES,
  };
}

function internalUpdateProperty(id, name, value) {
  return {
    type: UPDATE_NEW_PROPERTY,
    payload: {
      id,
      name,
      value,
    },
  };
}

function internalAddProperty(name, value) {
  return {
    type: ADD_NEW_PROPERTY,
    payload: {
      id: uuid.v1(),
      name,
      value,
    },
  };
}


function internalRemoveProperty(id) {
  return {
    type: REMOVE_NEW_PROPERTY,
    payload: id,
  };
}

// -----------------------------------------------------------------------------
// EXPORTED ACTIONS
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// DESCRIPTION
// -----------------------------------------------------------------------------
export function startEditDescription() {
  return {
    type: EDIT_DESCRIPTION_START,
  };
}

export function descriptionChanged(value) {
  Logger.debug(`New value: ${value}`);
  return {
    type: EDIT_DESCRIPTION_CHANGE,
    payload: value,
  };
}

export function revertEditDescription() {
  return {
    type: EDIT_DESCRIPTION_REVERT,
  };
}

function successEditDescription(experimentId, description) {
  return {
    type: EDIT_DESCRIPTION_SUCCESS,
    payload: {
      experimentId,
      description,
    },
  };
}


export function commitEditDescription(id, description) {
  return (dispatch) => {
    const promise = api.editDescription(id, description);
    promise.then(() => dispatch(successEditDescription(id, description)));
    dispatch({
      type: EDIT_DESCRIPTION_COMMIT,
    });
    return promise;
  };
}
// -----------------------------------------------------------------------------
// PROPERTIES
// -----------------------------------------------------------------------------
export function addNewProperty(name, value) {
  return (dispatch) => {
    dispatch(internalAddProperty(name, value));
    dispatch(internalValidateProperties);
  };
}

export function removeNewProperty(id) {
  return (dispatch) => {
    dispatch(internalRemoveProperty(id));
    dispatch(internalValidateProperties);
  };
}

export function updateNewProperty(id, name, value) {
  return (dispatch) => {
    dispatch(internalUpdateProperty(id, name, value));
    dispatch(internalValidateProperties());
  };
}

export function clearNewProperties() {
  return {
    type: CLEAR_NEW_PROPERTIES,
  };
}
