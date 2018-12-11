// Start app
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import theme from './theme';
import Routes from './routes';

// Import CSS
import './style/style.sass';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// const createStoreWithMiddleware = applyMiddleware()(createStore);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        {Routes}
      </Router>
    </MuiThemeProvider>
  </Provider>,
document.querySelector('.app'));
