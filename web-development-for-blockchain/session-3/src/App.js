import React, { useState } from 'react';
import NewTask from './NewTask.js';
import TaskList from './TaskList.js';

export default () => {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(0);

  const createTask = description => {
    setTasks(tasks => ([...tasks, {id: nextId, description, done: false}])); 
    setNextId(nextId + 1);
  };

  const markTaskDone = id => {
    const newTaskList = tasks.map(task => {
      if(task.id === id) {
        task.done = true;
      }
      return task;
    });
    setTasks(newTaskList);
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="jumbotron">
            <h1 className="display-4">Todo App</h1>
          </div>
          <NewTask createTask={createTask} />
          <br />
          <TaskList 
            tasks={tasks} 
            markTaskDone={markTaskDone} 
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}
