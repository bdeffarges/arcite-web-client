
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducer, { getPersistenceState } from './reducers';
import { loadState, saveState } from './utils/local_storage_utils';

import User from './model/user';

const middleware = [routerMiddleware(browserHistory), thunkMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// -----------------------------------------------------------------------------
// LOAD STATE FROM LOCAL STORAGE
// -----------------------------------------------------------------------------
const initialState = loadState();
if (initialState && initialState.auth && initialState.auth.user) {
  const oldUser = initialState.auth.user;
  const user = new User();
  user.fromApi(oldUser);
  initialState.auth.user = user;
}

// -----------------------------------------------------------------------------
// CREATE STORE
// -----------------------------------------------------------------------------
const store = createStore(reducer, initialState, composeEnhancers(
   applyMiddleware(...middleware)
 ));

// -----------------------------------------------------------------------------
// SUBSCRIBE TO STORE TO SAVE STATE TO LOCAL STORAGE ON CHANGES
// -----------------------------------------------------------------------------
store.subscribe(() => {
  const state = store.getState();
  const persistenceState = getPersistenceState(state);
  saveState(persistenceState);
});

export default store;
