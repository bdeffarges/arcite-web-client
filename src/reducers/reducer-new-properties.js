import _ from 'lodash';

import {
  ADD_NEW_PROPERTY,
  REMOVE_NEW_PROPERTY,
  UPDATE_NEW_PROPERTY,
  CLEAR_NEW_PROPERTIES,
  VALIDATE_NEW_PROPERTIES,
} from '../actions/actions-edit-experiment';

const initialState = {};

// -----------------------------------------------------------------------------
// EXPERIMENT DETAIL
// -----------------------------------------------------------------------------
const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
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

// const propertiesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD_EXPERIMENT_REQUEST:
//     case LOAD_EXPERIMENT_SUCCESS:
//     case LOAD_EXPERIMENT_FAILURE:
//       return currentExperimentReducer(state.currentExperiment, action);
//     case CREATE_EXPERIMENT_PROPERTY_REQUEST:
//     case CREATE_EXPERIMENT_PROPERTY_SUCCESS:
//     case CREATE_EXPERIMENT_PROPERTY_FAILURE: {
//       return addPropertiesReducer(state, action);
//     }
//     case ADD_NEW_PROPERTY:
//     case REMOVE_NEW_PROPERTY:
//     case UPDATE_NEW_PROPERTY:
//     case CLEAR_NEW_PROPERTIES:
//     case VALIDATE_NEW_PROPERTIES:
//       return utils.updateObject(
//         state,
//         { newProperties: newPropertiesReducer(state.newProperties, action) }
//       );
//     default:
//       return state;
//   }
// };


// -----------------------------------------------------------------------------
// SELECTORS
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// DEFAULT EXPORTS
// -----------------------------------------------------------------------------


export default propertiesReducer;
