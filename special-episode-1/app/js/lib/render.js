import {formatDate} from './utils.js';

//Constants used in `renderMessage()`
const MESSAGE_SUCCESS = 1;
const MESSAGE_FAILURE = 2;

/**
 * Render the tasks object. If there is no tasks to be rendered it will
 * display a message saying there are not tasks created yet
 * 
 * @param {Object} $tasks - Jquery DOM reference of the containers of tasks  
 * @param {Array} tasks - Array of Task objects to be rendered
 */
function renderTasks($tasks, tasks) {
  if(!tasks || tasks.length == 0) {
    return $tasks.append('<tr id="no-task-yet"><td scope="row">No task created yet...</td></tr>');
  }

  $tasks.empty();
  tasks.forEach((task) => {
    renderTaskToList($tasks, task);
  });
}

/**
 * Append a new task to the bottom of the Task list. 
 * If there its the firs task it will replace the content of $tasks
 * instead of appending to it, to remove the "no task created yet" message
 * 
 * @param {Object} $tasks - Jquery DOM reference of the containers of tasks  
 * @param {Object} task - The Task object to be rendered
 */
function renderTaskToList($tasks, task) {
  const checkedStatus  = task.done ? 'checked' : '';
  const checkedClass  = task.done ? 'task-done' : '';
  const date = formatDate(task.date);
  const html = `<tr id="${task.id}" class="task ${checkedClass}" ><td>${task.id}</td><td>${date}</td><td>${task.content}</td><td>${task.author}</td><td><input class="form-check-input" type="checkbox" ${checkedStatus}></div></td></tr>`;

  if($tasks.find('#no-task-yet').length != 0) {
    $tasks.html(html)
  } else {
    $tasks.append(html);
  }
}

/**
 * Take care of toggling the `task-done` css class of a task
 * 
 * @param {Object} $tasks - Jquery DOM reference of the containers of tasks   
 * @param {number} id - the task id of the task that was updated
 */
function renderTaskStatusUpdate($tasks, id) {
  const checkBox = $tasks.find(`#${id}`).toggleClass('task-done');
}

/**
 * Render the address of the smart contract used as a backend
 * 
 * @param {Object} $contractAddress - Jquery DOM reference of the container of the contract address   
 * @param {string} string - A string representing the contract address that is used as a backend for data
 */
function renderContractAddress($contractAddress, address) {
  $contractAddress.html(address);
}

/**
 * Render notification messages for the user, like successes or failures
 * 
 * @param {Object} $messageWrapper - Jquery DOM reference of the container of the message   
 * @param {string} string - The message to be displayed
 * @param {string} type - The type of message to be rendered. can be MESSAGE_SUCCESS or MESSAGE_FAILURE
 */
function renderMessage($messageWrapper, message, type) {
  let cssClass;
  if(type == MESSAGE_SUCCESS) {
    cssClass = 'alert-success';
  } else {
    cssClass = 'alert-danger';
  }

  const messageHTML = `<div class="alert ${cssClass}" role="alert">
    ${message}
  </div>`;

  //Insert HTML fragment into wrapper element and show it
  $messageWrapper.html(messageHTML);
  $messageWrapper.fadeIn();

  //Hide the message 2s after
  setTimeout(() => {
    $messageWrapper.fadeOut();
  }, 2000);
}

export {renderTasks, 
        renderTaskToList, 
        renderTaskStatusUpdate, 
        renderContractAddress, 
        renderMessage,
        MESSAGE_SUCCESS,
        MESSAGE_FAILURE};