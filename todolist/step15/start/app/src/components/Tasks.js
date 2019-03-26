import React, { Component } from 'react';
import { formatDate } from '../utils';

class Tasks extends Component {
  renderTask = (task) => {
    return (
      <tr key={task.id} >
        <td>{task[0]}</td>
        <td>{formatDate(task[1])}</td>
        <td>{task[2]}</td>
        <td>{task[3]}</td>
        <td>
          <input 
            type="checkbox" 
            checked={!!task[4]}
            onChange={() => this.props.toggleDone(task[0])}
          />
        </td>
        <td>
          {task[5] != '0' ? formatDate(task[5]) : ''}
        </td>
      </tr>
    );
  }
  render() {
    const { tasks } = this.props;

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
              {tasks.map((task) => this.renderTask(task))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }
}

export default Tasks;
