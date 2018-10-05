import React from 'react';
import { render } from 'react-dom';
import eth from './ethereum';
import App from './components/App';

eth.getAccounts.then(accounts => {
  render(
    <App web3={eth.web3} accounts={accounts} todo={eth.todo}/>,
    document.getElementById('app')
  );
})
