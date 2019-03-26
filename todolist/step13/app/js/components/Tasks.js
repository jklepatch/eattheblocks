import React from 'react';
import { formatDate } from '../utils';

const Tasks = (props) => {
  const renderTask = (task) => (
    <tr key={task.id}>
      <td>{task[0]}</td>
      <td>{formatDate(task[1])}</td>
      <td>{task[2]}</td>
      <td>{task[3]}</td>
      <td>
        <input
          type='checkbox'
          onChange={() => props.toggleDone(task[0])}
          checked={!!task[4]}
        />
      </td>
      <td>{task[5] != '0' ? formatDate(task[5]) : ''}</td>
    </tr>
  );
  return (
    <div className="card">
      <div className="row">
        <div className="col-sm-12">
          <h2 className="orange">Tasks</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Content</th>
                <th>Author</th>
                <th>Done</th>
                <th>Date Complete</th>
              </tr>
            </thead>
            <tbody id="tasks">
              {props.tasks.map((task) => renderTask(task))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
