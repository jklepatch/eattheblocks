import React from 'react';
import { formatDate } from '../utils';

const Tasks = (props) => {
  const renderTask = (task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{formatDate(task.date)}</td>
      <td>{task.content}</td>
      <td>{task.author}</td>
      <td>
        <input
          type='checkbox'
          onChange={() => props.toggleDone(task.id)}
          checked={!!task.done}
        />
      </td>
      <td>{task.completeDate != '0' ? formatDate(task.completeDate) : ''}</td>
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
