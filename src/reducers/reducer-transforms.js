import _ from 'lodash';

import Logger from '../logger';
import {
  LOAD_TRANSFORMS_REQUEST,
  LOAD_TRANSFORMS_SUCCESS,
  LOAD_TRANSFORMS_FAILURE,
  SELECT_DATA_TRANSFORM,
  SELECT_NEXT_TRANSFORM,
  RUN_TRANSFORM_REQUEST,
  RUN_TRANSFORM_SUCCESS,
  RUN_TRANSFORM_FAILURE,
  TOGGLE_HIDE_FAILED_TRANSFORMS,
} from '../actions/actions-transforms';

const initialState = {
  items: {},
  isLoading: false,
  error: undefined,
  currentDataTransform: undefined,
  nextTransform: undefined,
  hideFailedTransforms: false,
};


// -----------------------------------------------------------------------------
// ALL TRANSFORMS REDUCER
// -----------------------------------------------------------------------------
const allTransformsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRANSFORMS_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case LOAD_TRANSFORMS_SUCCESS: {
      return { ...state, isLoading: false, items: action.payload };
    }
    case LOAD_TRANSFORMS_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};


// -----------------------------------------------------------------------------
// RUN TRANSFORM REDUCER
// -----------------------------------------------------------------------------
const runTransformReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUN_TRANSFORM_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case RUN_TRANSFORM_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// MAIN REDUCER
// -----------------------------------------------------------------------------

const transformsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRANSFORMS_REQUEST:
    case LOAD_TRANSFORMS_SUCCESS:
    case LOAD_TRANSFORMS_FAILURE: {
      return { ...allTransformsReducer(state, action) };
    }
    case RUN_TRANSFORM_REQUEST:
    case RUN_TRANSFORM_SUCCESS:
    case RUN_TRANSFORM_FAILURE: {
      return { ...runTransformReducer(state, action) };
    }
    case SELECT_DATA_TRANSFORM: {
      return {
        ...state,
        currentDataTransform: action.payload,
      };
    }
    case SELECT_NEXT_TRANSFORM: {
      return {
        ...state,
        nextTransform: action.payload,
      };
    }
    case TOGGLE_HIDE_FAILED_TRANSFORMS: {
      return {
        ...state,
        hideFailedTransforms: !state.hideFailedTransforms,
      };
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// EXPORT DEFAULT REDUCER
// -----------------------------------------------------------------------------

export default transformsReducer;


// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------
export const getAllTransforms = state => state.items;

export const getCurrentDataTransform = (state, experimentTransforms) => {
  if (experimentTransforms) {
    return experimentTransforms[state.currentDataTransform];
  }
  return {};
};

export const getPossibleNextTransforms = (state, currentDataTransform) => {
  if (currentDataTransform) {
    Logger.debug(currentDataTransform);
    Logger.debug(state.items);
    const values = _.values(state.items).filter((transform) => {
      if (transform.dependsOnUid) {
        return transform.dependsOnUid === currentDataTransform.transformId;
      }
      return true;
    });

    return _.keyBy(values, 'id');
  }
  return {};
};

export const getTransformById = (state, transformId) => state.items[transformId];

export const getHideFailedTransforms = state => state.hideFailedTransforms;

// -----------------------------------------------------------------------------
// PERSISTENT STATE
// -----------------------------------------------------------------------------
export const getPersistenceState = state => ({
  ...initialState,
  hideFailedTransforms: state.hideFailedTransforms,
});
