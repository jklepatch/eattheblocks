import React, { Component } from 'react';
import { formatDate } from '../utils';
import withDrizzle from './DrizzleContainer';

class Tasks extends Component {
  state = {
    tasksKey: null
  }

  componentDidMount() {
    const Todo = this.props.drizzle.contracts.ToDo;
    const tasksKey = Todo.methods['getTasks'].cacheCall();
    this.setState({tasksKey});
  }

  toggleDone = (id) => {
    const Todo = this.props.drizzle.contracts.ToDo;
    Todo
      .methods['toggleDone']
      .cacheSend({
        from: this.props.drizzleState.accounts[0]
      });
  }

  renderTask = (task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{formatDate(task.date)}</td>
      <td>{task.content}</td>
      <td>{task.author}</td>
      <td>
        <input
          type='checkbox'
          onChange={() => this.toggleDone(task.id)}
          checked={!!task.done}
        />
      </td>
      <td>{task.completeDate != '0' ? formatDate(task.completeDate) : ''}</td>
    </tr>
  );

  render() {
    const { Todo } = this.props.drizzleState.contracts;
    const { tasksKey } = this.state;
    const tasks = Todo.getTasks[tasksKey];
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
                {tasks && tasks.value.map((task) => renderTask(task))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default withDrizzle(Tasks);
