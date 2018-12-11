import {
  LOAD_ORGANIZATION_REQUEST,
  LOAD_ORGANIZATION_SUCCESS,
  LOAD_ORGANIZATION_FAILURE,
} from '../actions/actions-organization';

const initialState = {
  item: {},
  isLoading: false,
  error: {},
};

const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORGANIZATION_REQUEST: {
      return { ...state, isLoading: true };
    }
    case LOAD_ORGANIZATION_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case LOAD_ORGANIZATION_SUCCESS: {
      return { ...state, isLoading: false, error: '', item: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default baseReducer;

// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------

export const getOrganization = state => state.item;
