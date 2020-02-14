import * as React from 'react';
import { Task } from '../types';
import { formatDate } from '../utils';

interface TaskListProps {
  tasks: Task[]
  toggleDone: (id: string) => void
};

class Tasks extends React.Component<TaskListProps> {
  renderTask = (task: Task, i: number) => {
    return (
      <tr key={i} >
        <td>{task.id}</td>
        <td>{formatDate(task.date)}</td>
        <td>{task.content}</td>
        <td>{task.author}</td>
        <td>
          <input 
            type="checkbox" 
            checked={!!task.done}
            onChange={() => this.props.toggleDone(task.id)}
          />
        </td>
        <td>
          {task.dateComplete != '0' ? formatDate(task.dateComplete) : ''}
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
              {tasks.map((task, i) => this.renderTask(task, i))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  }
}

export default Tasks;
