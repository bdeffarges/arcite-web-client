import { push } from 'react-router-redux';

export const goTo = route => dispatch => dispatch(push(route));

export default {
  goTo,
};
