import {App} from './app.js';
import {Task} from './task.js';
import {renderTasks, 
        renderTaskToList, 
        renderTaskStatusUpdate, 
        renderMessage,
        MESSAGE_SUCCESS,
        MESSAGE_FAILURE} 
        from './render.js';
import {getJSON} from './utils.js';

function getAccount(app) {
  var web3 = new Web3(app.web3Provider);
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, accounts) => {
      if(typeof error === null) {
        return reject(error);
      } 
      app.setAccount(accounts);
      resolve(app.account);
    });
  });
}

function getContractInstance(app, contractName, artifactFile) {
  return new Promise((resolve, reject) => {
    getJSON(artifactFile)
    .then((contractArtifact) => {
      const contractAbstraction = app.getContractAbstraction(contractName, contractArtifact);
      //Careful here, `getContractAddressFromArtifact()` is a static method, only
      //reachable with `App` the reference to the class, and not `app` the reference
      //to the instance
      const contractAddress = App.getContractAddressFromArtifact(contractArtifact);
      return app.buildContractInstanceFromAddress(contractName, contractAbstraction, contractAddress);
    })
    .then((instance) => {
      resolve(instance);
    })
    .catch((error) => { 
      console.error("Could not execute getContractInstance(): " + error);
      reject(error);
    });
  });
}

function getTasks(app) {
  return new Promise((resolve, reject) => {
    app.ToDo.getTaskIds()
    .then((taskIds) => {
      var promises = [];
      taskIds.forEach((taskId) => {
        promises.push(app.ToDo.getTask(taskId));
      });
      return Promise.all(promises);
    })
    .then((tasks) => {
      resolve(tasks.map((task) => new Task(task)));
    })
    .catch((error) => {
      reject(error);
    });
  });
}

function createTask(app, content, author) {
  const task = new Task({content, author});
  app.ToDo.createTask(task.content, task.author, {from: app.account, gas: 1000000})
  .then((result) => {
    //Retrieve missing info of Task object from transaction log
    task.id = result.logs[0].args.id;
    task.date = result.logs[0].args.date;

    //Display success message
    const message = `New task created successfully by ${task.author}. Task Id: ${task.id}`
    renderMessage(app.HTML.$messageWrapper, message, MESSAGE_SUCCESS);

    //Add the task to the task list
    renderTaskToList(app.HTML.$tasks, task);
  })
  .catch((error) => {
    const message = 'Ooops... there was a problem... The new task wasn\'t created';
    renderMessage(app.HTML.$messageWrapper, message, MESSAGE_FAILURE);
    console.error(error);
  });
}

function refreshTasks(app) {
  getTasks(app)
  .then((tasks) => {
    renderTasks(app.HTML.$tasks, tasks);
  })
  .catch((error) => {
    console.error(error);
  });
}

function toggleTaskStatus(app, id) {
  app.ToDo.toggleTaskStatus(id, {from: app.account, gas: 1000000})
  .then((result) => {
    const done = result.logs[0].args.done ? 'done' : 'not done';
    const message = `Task ${id} mark as ${done}`;
    renderMessage(app.HTML.$messageWrapper, message, MESSAGE_SUCCESS);
    renderTaskStatusUpdate(app.HTML.$tasks, id);
  })
  .catch((error) => {
    const message = `Ooops... The status update of task ${id} failed: ${error}`;
    renderMessage(app.HTML.$messageWrapper, message, MESSAGE_FAILURE);
    console.error(error);
  })
}

export {getAccount, getContractInstance, getTasks, createTask, refreshTasks, toggleTaskStatus};