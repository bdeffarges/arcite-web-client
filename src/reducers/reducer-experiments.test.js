import _ from 'lodash';

import reducer from './reducer-experiments';
import * as actions from '../actions/actions-experiments';

const experiments = [
  {
    id: 1,
    title: 'Experiment 1',
  },
  {
    id: 2,
    title: 'Experiment 2',
  },
  {
    id: 3,
    title: 'Experiment 3',
  },
];

const experimentsWithDetails = [
  {
    id: 1,
    title: 'Experiment 1',
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Experiment 2',
    description: 'Description 2',
  },
  {
    id: 3,
    title: 'Experiment 3',
    description: 'Description 3',
  },
];

describe('Experiment Reducer', () => {
  it('can request to load all experiments', () => {
    let state = {};
    state = reducer(state, {
      type: actions.LOAD_EXPERIMENTS_REQUEST,
    });

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeUndefined();
  });
  it('can load all experiments', () => {
    let state = {};
    state = reducer(state, {
      type: actions.LOAD_EXPERIMENTS_SUCCESS,
      payload: _.keyBy(experiments, 'id'),
    });
    expect(_.values(state.items)).toHaveLength(experiments.length);
    expect(state.isLoading).toBeFalsy();
    expect(state.error).toBeUndefined();
  });

  it('can fail while loading experiments', () => {
    let state = {};
    const error = 'Error message';
    state = reducer(state, {
      type: actions.LOAD_EXPERIMENTS_FAILURE,
      payload: error,
    });
    expect(state.isLoading).not.toBeTruthy();
    expect(state.error).toBe(error);
  });

  it('can load a single experiment', () => {
    let state = {};
    state = reducer(state, {
      type: actions.LOAD_EXPERIMENTS_SUCCESS,
      payload: _.keyBy(experiments.slice(0, 2), 'id'),
    });

    expect(_.values(state.items)).toHaveLength(2);
    expect(_.values(state.items)[0].description).toBeUndefined();

    state = reducer(state, {
      type: actions.LOAD_EXPERIMENT_SUCCESS,
      payload: experimentsWithDetails[0],
    });

    expect(_.values(state.items)).toHaveLength(2);
    expect(state.currentExperiment).toBe(experiments[0].id);
    expect(state.items[experiments[0].id].description).toBeDefined();

    state = reducer(state, {
      type: actions.LOAD_EXPERIMENT_SUCCESS,
      payload: experimentsWithDetails[2],
    });

    expect(_.values(state.items)).toHaveLength(3);
    expect(state.currentExperiment).toBe(experiments[2].id);
    expect(state.items[experiments[2].id].description).toBeDefined();
  });
});
