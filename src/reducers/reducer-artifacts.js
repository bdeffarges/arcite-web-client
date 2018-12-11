import _ from 'lodash';

import {
  LOAD_GLOBAL_ARTIFACTS_REQUEST,
  LOAD_GLOBAL_ARTIFACTS_SUCCESS,
  LOAD_GLOBAL_ARTIFACTS_FAILURE,
  LOAD_PUBLISHED_ARTIFACTS_REQUEST,
  LOAD_PUBLISHED_ARTIFACTS_SUCCESS,
  LOAD_PUBLISHED_ARTIFACTS_FAILURE,
  PUBLISH_ARTIFACT_REQUEST,
  PUBLISH_ARTIFACT_SUCCESS,
  PUBLISH_ARTIFACT_FAILURE,
  UNPUBLISH_ARTIFACT_REQUEST,
  UNPUBLISH_ARTIFACT_SUCCESS,
  UNPUBLISH_ARTIFACT_FAILURE,
} from '../actions/actions-artifacts';

const initialState = {
  items: {},
  globalItems: {},
  isLoading: false,
  error: undefined,
};

// -----------------------------------------------------------------------------
// LOAD GLOBAL ARTIFACTS
// -----------------------------------------------------------------------------
const loadGlobalArtifacts = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GLOBAL_ARTIFACTS_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case LOAD_GLOBAL_ARTIFACTS_FAILURE: {
      return { ...state, isLoading: true, error: action.payload };
    }
    case LOAD_GLOBAL_ARTIFACTS_SUCCESS: {
      const artifacts = _.keyBy(action.payload, artifact => artifact.key);
      return {
        ...state,
        globalItems: {
          ...state.globalItems,
          ...artifacts,
        },
      };
    }
    default: {
      return state;
    }
  }
};

// -----------------------------------------------------------------------------
// LOAD PUBLISHED ARTIFACTS
// -----------------------------------------------------------------------------
const loadPublishedArtifacts = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PUBLISHED_ARTIFACTS_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case LOAD_PUBLISHED_ARTIFACTS_FAILURE: {
      return { ...state, isLoading: true, error: action.payload };
    }
    case LOAD_PUBLISHED_ARTIFACTS_SUCCESS: {
      const artifacts = _.keyBy(action.payload, artifact => artifact.key);
      return {
        ...state,
        items: {
          ...state.items,
          ...artifacts,
        },
      };
    }
    default: {
      return state;
    }
  }
};


// -----------------------------------------------------------------------------
// PUBLISH ARTIFACT REDUCER
// -----------------------------------------------------------------------------
const publishArtifactReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUBLISH_ARTIFACT_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case PUBLISH_ARTIFACT_SUCCESS: {
      const artifact = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [artifact.key]: artifact,
        },
      };
    }
    case PUBLISH_ARTIFACT_FAILURE: {
      return { ...state, isLoading: true, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

// -----------------------------------------------------------------------------
// UNPUBLISH ARTIFACT REDUCER
// -----------------------------------------------------------------------------
const unpublishArtifactReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNPUBLISH_ARTIFACT_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case UNPUBLISH_ARTIFACT_SUCCESS: {
      const artifactKey = action.payload;
      return {
        ...state,
        items: _.omit(state.items, artifactKey),
      };
    }
    case UNPUBLISH_ARTIFACT_FAILURE: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
// -----------------------------------------------------------------------------
// MAIN REDUCER
// -----------------------------------------------------------------------------

const artifactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GLOBAL_ARTIFACTS_REQUEST:
    case LOAD_GLOBAL_ARTIFACTS_FAILURE:
    case LOAD_GLOBAL_ARTIFACTS_SUCCESS: {
      return { ...loadGlobalArtifacts(state, action) };
    }
    case LOAD_PUBLISHED_ARTIFACTS_REQUEST:
    case LOAD_PUBLISHED_ARTIFACTS_FAILURE:
    case LOAD_PUBLISHED_ARTIFACTS_SUCCESS: {
      return { ...loadPublishedArtifacts(state, action) };
    }
    case UNPUBLISH_ARTIFACT_REQUEST:
    case UNPUBLISH_ARTIFACT_SUCCESS:
    case UNPUBLISH_ARTIFACT_FAILURE: {
      return { ...unpublishArtifactReducer(state, action) };
    }
    case PUBLISH_ARTIFACT_REQUEST:
    case PUBLISH_ARTIFACT_SUCCESS:
    case PUBLISH_ARTIFACT_FAILURE: {
      return { ...publishArtifactReducer(state, action) };
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// EXPORT DEFAULT REDUCER
// -----------------------------------------------------------------------------

export default artifactsReducer;


// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------

export const getPublishedArtifacts = state => state.items;

export const getRecentGlobalArtifacts = (state, limit) => {
  if (!limit) {
    return {};
  }
  const artifacts = _.values(state.globalItems).slice(0, limit);
  return _.keyBy(artifacts, 'id');
};
