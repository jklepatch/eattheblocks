import React from 'react';
import { render } from 'react-dom';
import store from './store';
import App from './components/App';
import { DrizzleContext } from 'drizzle-react';

render(
  <DrizzleContext.Provider drizzle={store}>
    <App/>
  </DrizzleContext.Provider>,
  document.getElementById('app')
);