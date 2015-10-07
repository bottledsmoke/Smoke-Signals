import 'normalize.css';
import './styles.css';
import 'babel-core/polyfill';

import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from '../node_modules/react-router/node_modules/history/lib/createBrowserHistory';
import configureStore from './stores/store';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from './containers/App';
import Journal from './components/Journal';

const history = createBrowserHistory();
const store = configureStore();

React.render(
  <div>
    <Provider store={store}>
      {
        () =>
          <Router history={history}>
            <Route component={App} path="/"/>
            <Route component={Journal} path="/journal"/>
          </Router>
      }
    </Provider>
    <DebugPanel bottom right top>
      <DevTools monitor={LogMonitor}
                store={store}
                visibleOnLoad
      />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);


