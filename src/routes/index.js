import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/container-app';
import Browse from '../containers/experiment/container-browse';
import Login from '../containers/container-login';
import ExperimentDetail from '../containers/experiment/container-experiment-detail';
import ExperimentCreate from '../containers/experiment/container-create-experiment';
import ExperimentClone from '../containers/experiment/container-clone-experiment';

import * as routeHandlers from './route_handlers';

export default (
  <Route name="/" path="/" component={App}>
    <IndexRoute component={Browse} />
    <Route name="browse" path="browse" component={Browse} />
    <Route name="login" path="login(?:from)" component={Login} />
    <Route name="experiments" path="experiments">
      <Route path="create" component={ExperimentCreate} onEnter={routeHandlers.authHandler} />
      <Route path="clone/:uid" component={ExperimentClone} onEnter={routeHandlers.authHandler} />
      <Route path=":uid" component={ExperimentDetail} />
    </Route>
  </Route>
);
