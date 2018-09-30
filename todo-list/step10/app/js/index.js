import React from 'react';
import { render } from 'react-dom';
import eth from './ethereum'
import App from './components/App';

render(
  <App {...eth} />,
  document.getElementById('app')
);