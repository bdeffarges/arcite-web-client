// -----------------------------------------------------------------------------
// BROWSE" FILTER EXPERIMENT
// -----------------------------------------------------------------------------
export const FILTER_EXPERIMENTS = 'ui/experiment__query';
export const DESIGN_SORT_BY = 'ui/design/sort__by';
export const DESIGN_COLOR_BY = 'ui/design/color__by';
export const DESIGN_EDITOR_MODE = 'ui/design/editor__mode';

export function filterExperiments(query) {
  return {
    type: FILTER_EXPERIMENTS,
    payload: query,
  };
}

export function sortSamplesBy(condition) {
  return {
    type: DESIGN_SORT_BY,
    payload: condition,
  };
}

export function colorSamplesBy(condition) {
  return {
    type: DESIGN_COLOR_BY,
    payload: condition,
  };
}

export function setDesignEditorMode(mode) {
  return {
    type: DESIGN_EDITOR_MODE,
    payload: mode,
  };
}
