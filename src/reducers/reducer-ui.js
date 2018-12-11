import {
  FILTER_EXPERIMENTS,
  DESIGN_SORT_BY,
  DESIGN_COLOR_BY,
  DESIGN_EDITOR_MODE,
} from '../actions/actions-ui';

const initialState = {
  experimentQuery: '',
  samples: {
    sortBy: undefined,
    colorBy: undefined,
  },
  design: {
    editorMode: 'mainMenu',
  },
};


// -----------------------------------------------------------------------------
// COMBINE THE REDUCER
// -----------------------------------------------------------------------------

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_EXPERIMENTS:
      return {
        ...state,
        experimentQuery: action.payload,
      };
    case DESIGN_SORT_BY:
      return {
        ...state,
        samples: {
          ...state.samples,
          sortBy: action.payload,
        },
      };
    case DESIGN_COLOR_BY:
      return {
        ...state,
        samples: {
          ...state.samples,
          colorBy: action.payload,
        },
      };
    case DESIGN_EDITOR_MODE:
      return {
        ...state,
        design: {
          ...state.design,
          editorMode: action.payload,
        },
      };

    default:
      return state;
  }
};

// -----------------------------------------------------------------------------
// SELECTOR
// -----------------------------------------------------------------------------

export const getExperimentQuery = state => state.experimentQuery;
export const getColorSamplesBy = state => state.samples.colorBy;
export const getSortSamplesBy = state => state.samples.sortBy;
export const getDesignEditorMode = state => state.design.editorMode;

export default uiReducer;
