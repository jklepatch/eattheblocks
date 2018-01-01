import {renderContractAddress, renderMessage} from './lib/render.js';
import {getJSON} from './lib/utils.js';
import {getAccount, getContractInstance, refreshTasks} from './lib/actions.js';
import {attachEventHandlers} from './lib/events.js';
import {App} from './lib/app.js';

const Web3 = require('web3');

$(() => {

  init(); 

  /**
   * Boostrap the app:
   *   - Get account to send transaction from
   *   - Get up-to-date contract artifact(ToDo.json) from server, and
   *         populate `app` objects 
   *   - Populate `app` objects with above information
   *   - Get all tasks from the deployed ToDo.sol contract and display them
   *   - Get contract address and display it
   *   - Attach event handlers for creating new task and toggling done/not done
   *     status of tasks
   */
  function init() {
    const app = new App($, Web3);
    getAccount(app)
    .then(() => {
      return getContractInstance(app, 'ToDo', 'ToDo.json');
    })
    .then(() => {
      return refreshTasks(app);
    })
    .then(() => {
      renderContractAddress(app.HTML.$contractAddress, app.ToDo.address);
      attachEventHandlers(app);
    })
    .catch((error) => {
      console.error("Initialisation failed: " + error);
    });
  }
});