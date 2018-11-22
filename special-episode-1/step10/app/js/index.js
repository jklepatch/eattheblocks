import React from 'react';
import { render } from 'react-dom';
import eth from './ethereum';
import App from './components/App';

render(
  <App web3={eth.web3} todo={eth.todo}/>,
    document.getElementById('app')
);
