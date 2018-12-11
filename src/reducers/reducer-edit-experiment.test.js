import _ from 'lodash';

import reducer from './reducer-edit-experiment';
import { ADD_NEW_PROPERTY, REMOVE_NEW_PROPERTY, UPDATE_NEW_PROPERTY, CLEAR_NEW_PROPERTIES, VALIDATE_NEW_PROPERTIES, EDIT_DESCRIPTION_START, EDIT_DESCRIPTION_CHANGE, EDIT_DESCRIPTION_COMMIT, EDIT_DESCRIPTION_REVERT } from '../actions/actions-edit-experiment';

function getKeys(state) {
  return _.keys(state.properties);
}

function getProperty(state, id) {
  return state.properties[id];
}

function addProperty(state, prop, id) {
  return reducer(state, {
    type: ADD_NEW_PROPERTY,
    payload: { ...prop, id },
  });
}

describe('Edit Experiment Reducer', () => {
  it('can start to edit the description', () => {
    let state = {};
    state = reducer(state, {
      type: EDIT_DESCRIPTION_START,
    });
    expect(state.description.edit).toBeTruthy();
  });

  it('can commit the description changes', () => {
    let state = {};
    state = reducer(state, {
      type: EDIT_DESCRIPTION_CHANGE,
      payload: 'New value',
    });
    expect(state.description.value).toBe('New value');
  });

  it('can revert the description changes', () => {
    let state = {
      description: {
        edit: true,
        value: 'My current value',
      },
    };
    state = reducer(state, {
      type: EDIT_DESCRIPTION_REVERT,
    });
    expect(state.description.edit).not.toBeTruthy();
    expect(state.description.value).toHaveLength(0);
  });

  it('can commit the description changes', () => {
    let state = {
      description: {
        edit: true,
        value: 'My current value',
      },
    };
    state = reducer(state, {
      type: EDIT_DESCRIPTION_COMMIT,
    });
    expect(state.description.edit).not.toBeTruthy();
    expect(state.description.value).toHaveLength(0);
  });

  it('can add a new property for an experiment', () => {
    let state = {};
    const newProp = {
      name: 'New prop',
      value: 'New value',
    };
    state = addProperty(state, newProp, 1);
    state = addProperty(state, newProp, 2);
    const keys = getKeys(state);
    expect(keys).toHaveLength(2);
    const obj = getProperty(state, 1);
    expect(obj.name).toBe(newProp.name);
    expect(obj.value).toBe(newProp.value);
  });

  it('can remove a new property for an experiment', () => {
    let state = {};
    const prop = {
      name: 'A prop',
      value: 'A value',
    };

    state = addProperty(state, prop, 1);
    state = addProperty(state, prop, 2);

    let keys = getKeys(state);
    expect(keys).toHaveLength(2);

    state = reducer(state, {
      type: REMOVE_NEW_PROPERTY,
      payload: 1,
    });

    keys = getKeys(state);
    expect(keys).toHaveLength(1);
    expect(getProperty(state, 1)).toBeUndefined();
    expect(getProperty(state, 2)).toBeDefined();
  });

  it('can update a new properties value', () => {
    let state = {};
    const prop = {
      name: 'A prop',
      value: 'A value',
    };

    const newName = 'This is a new name';
    const newValue = 'This is a new value';
    const newValue2 = 'This is a new value...';

    state = addProperty(state, prop, 1);
    state = addProperty(state, prop, 2);

    let keys = getKeys(state);
    expect(keys).toHaveLength(2);

    state = reducer(state, {
      type: UPDATE_NEW_PROPERTY,
      payload: {
        id: 1,
        name: newName,
        value: newValue,
      },
    });

    keys = getKeys(state);
    expect(keys).toHaveLength(2);
    const id = 1;
    let obj = getProperty(state, id);
    expect(obj.id).toBe(id);
    expect(obj.name).toBe(newName);
    expect(obj.value).toBe(newValue);

    state = reducer(state, {
      type: UPDATE_NEW_PROPERTY,
      payload: {
        id: 1,
        name: newName,
        value: newValue2,
      },
    });

    obj = getProperty(state, id);
    expect(obj.id).toBe(id);
    expect(obj.name).toBe(newName);
    expect(obj.value).toBe(newValue2);
  });

  it('can clear all the new properties', () => {
    let state = {};
    state = addProperty(state, { name: 'First Prop', value: 'Value' }, 1);
    state = addProperty(state, { name: 'Second Prop', value: 'Value' }, 2);
    state = addProperty(state, { name: 'Third Prop', value: 'Value' }, 3);

    let keys = getKeys(state);
    expect(keys).toHaveLength(3);
    state = reducer(state, {
      type: CLEAR_NEW_PROPERTIES,
    });
    keys = getKeys(state);
    expect(keys).toHaveLength(0);
  });

  it('can validate properties for duplicates', () => {
    let state = {};
    state = addProperty(state, {
      name: 'Same name',
      value: 'A value',
    }, 1);
    state = addProperty(state, {
      name: 'Same name',
      value: 'A different value',
    }, 2);
    state = addProperty(state, {
      name: 'Different name',
      value: 'A different value',
    }, 3);

    state = reducer(state, {
      type: VALIDATE_NEW_PROPERTIES,
    });
    const keys = getKeys(state);
    expect(keys).toHaveLength(3);
    expect(getProperty(state, 1).error).toBeDefined();
    expect(getProperty(state, 2).error).toBeDefined();
    expect(getProperty(state, 3).error).toBeUndefined();
  });
});
