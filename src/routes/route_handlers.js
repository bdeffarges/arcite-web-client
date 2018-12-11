import store from '../store';

export const authHandler = (nextState, replace) => {
  if (!store.getState().auth.user) {
    replace(`/login?from=${nextState.location.pathname}`);
  }
};

export default {
  authHandler,
};
