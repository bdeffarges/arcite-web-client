import reducer from './reducer-ui';
import { FILTER_EXPERIMENTS } from '../actions/actions-ui';


describe('UI Reducer', () => {
  it('can set the filter for browsing experiments', () => {
    const filterTerm = 'A filter';
    const newState = reducer(undefined, {
      type: FILTER_EXPERIMENTS,
      payload: filterTerm,
    });

    expect(newState.experimentQuery).toBe(filterTerm);
  });
});
