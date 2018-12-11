import Logger from '../logger';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    Logger.warn('Could not read state from local storage');
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    localStorage.setItem('auth', JSON.stringify(state.auth));
  } catch (err) {
    Logger.warn('Could not write state to local storage');
  }
};
