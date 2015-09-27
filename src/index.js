import 'normalize.css';
import 'babel-core/polyfill';

import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from '../node_modules/react-router/node_modules/history/lib/createBrowserHistory';
import configureStore from './stores/store';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import App from './containers/App';

const history = createBrowserHistory();
const store = configureStore();

React.render(
  <div>
    <Provider store={store}>
      {
        () =>
          <Router history={history}>
            <Route path='/' component={App}/>
          </Router>
      }
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store}
                monitor={LogMonitor}
                visibleOnLoad={true} />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);


