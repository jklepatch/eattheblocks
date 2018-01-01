import {createTask, toggleTaskStatus} from './actions.js';

function attachEventHandlers(app) {
  app.HTML.$newTask.on('submit', (event) => {
    onSubmitNewTask(app, event);
  });

  app.HTML.$tasks.on('click', (event) => {
    onToggleTaskStatus(app, event);
  });
}

function onSubmitNewTask(app, event) {
  event.preventDefault();
  createTask(app, app.HTML.$newTaskContent.val(), app.HTML.$newTaskAuthor.val());
}

function onToggleTaskStatus(app, event) {
  const id = $(event.target).parents('.task').first().attr('id');
  toggleTaskStatus(app, id)
}

export {attachEventHandlers};