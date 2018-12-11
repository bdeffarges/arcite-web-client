import _ from 'lodash';

import {
  LOAD_EXPERIMENT_SUCCESS,
  CREATE_EXPERIMENT_PROPERTY_SUCCESS,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_PROGRESS,
 } from '../actions/actions-experiments';

import {
  ADD_NEW_PROPERTY,
  REMOVE_NEW_PROPERTY,
  UPDATE_NEW_PROPERTY,
  CLEAR_NEW_PROPERTIES,
  VALIDATE_NEW_PROPERTIES,
  EDIT_DESCRIPTION_START,
  EDIT_DESCRIPTION_CHANGE,
  EDIT_DESCRIPTION_COMMIT,
  EDIT_DESCRIPTION_REVERT,
} from '../actions/actions-edit-experiment';

export const initialState = {
  description: {
    edit: false,
    value: '',
  },
  properties: {},
  upload: {},
};

// -----------------------------------------------------------------------------
// DESCRIPTION
// -----------------------------------------------------------------------------
const descriptionReducer = (state = initialState.description, action) => {
  switch (action.type) {
    case LOAD_EXPERIMENT_SUCCESS: {
      const { description } = action.payload;
      return { ...state, edit: false, value: description };
    }
    case EDIT_DESCRIPTION_START: {
      return { ...state, value: action.payload, edit: true };
    }
    case EDIT_DESCRIPTION_CHANGE: {
      return { ...state, value: action.payload };
    }
    case EDIT_DESCRIPTION_COMMIT:
    case EDIT_DESCRIPTION_REVERT: {
      return { ...state, edit: false, value: '' };
    }

    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// UPLOAD
// -----------------------------------------------------------------------------
const uploadReducer = (state = initialState.upload, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST: {
      const { file } = action.payload;
      file.progress = 0;
      return {
        ...state,
        [file.id]: file,
      };
    }
    case UPLOAD_FILE_SUCCESS:
    case UPLOAD_FILE_FAILURE: {
      const { file } = action.payload;
      file.progress = undefined;
      return _.omit(state, file.id);
    }
    case UPLOAD_FILE_PROGRESS: {
      const { file } = action.payload;
      return {
        ...state,
        [file.id]: file,
      };
    }
    default:
      return state;
  }
};


// -----------------------------------------------------------------------------
// PROPERTIES
// -----------------------------------------------------------------------------
const propertiesReducer = (state = initialState.properties, action) => {
  switch (action.type) {
    case LOAD_EXPERIMENT_SUCCESS:
    case CREATE_EXPERIMENT_PROPERTY_SUCCESS: {
      return {};
    }
    case ADD_NEW_PROPERTY: {
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          value: action.payload.value,
        },
      };
    }
    case REMOVE_NEW_PROPERTY: {
      return _.omit(state, action.payload);
    }
    case UPDATE_NEW_PROPERTY: {
      const prop = state[action.payload.id];
      if (!prop) {
        return state;
      }
      const newProp = {
        id: action.payload.id,
        name: action.payload.name,
        value: action.payload.value,
      };

      return { ...state, [action.payload.id]: newProp };
    }
    case CLEAR_NEW_PROPERTIES: {
      return [];
    }

    case VALIDATE_NEW_PROPERTIES: {
      const propsByName = _.groupBy(state, 'name');
      const validatedProps = _.values(state).map((prop) => {
        if (propsByName[prop.name].length > 1) {
          return { ...prop, error: `${prop.name} seems to be duplicated` };
        }
        return { ...prop, error: undefined };
      });
      return _.keyBy(validatedProps, 'id');
    }
    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// COMBINE SINGLE PARTS
// -----------------------------------------------------------------------------

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPERIMENT_SUCCESS:
    case CREATE_EXPERIMENT_PROPERTY_SUCCESS:
      return {
        ...state,
        description: descriptionReducer(state.description, action),
        properties: propertiesReducer(state.properties, action),
      };
    case ADD_NEW_PROPERTY:
    case REMOVE_NEW_PROPERTY:
    case UPDATE_NEW_PROPERTY:
    case CLEAR_NEW_PROPERTIES:
    case VALIDATE_NEW_PROPERTIES:
      return { ...state, properties: propertiesReducer(state.properties, action) };
    case EDIT_DESCRIPTION_START:
    case EDIT_DESCRIPTION_CHANGE:
    case EDIT_DESCRIPTION_COMMIT:
    case EDIT_DESCRIPTION_REVERT:
      return { ...state, description: descriptionReducer(state.description, action) };
    case UPLOAD_FILE_REQUEST:
    case UPLOAD_FILE_SUCCESS:
    case UPLOAD_FILE_FAILURE:
    case UPLOAD_FILE_PROGRESS:
      return { ...state, upload: uploadReducer(state.upload, action) };
    default: {
      return state;
    }

  }
};
// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// DEFAULT EXPORTS
// -----------------------------------------------------------------------------

export default editReducer;
