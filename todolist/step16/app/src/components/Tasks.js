import React, { Component } from 'react';
import { formatDate } from '../utils';
import withDrizzle from './DrizzleContainer';

class Tasks extends Component {
  state = {
    tasksKey: null
  }

  componentDidMount() {
    const ToDo = this.props.drizzle.contracts.ToDo;
    const tasksKey = ToDo.methods['getTasks'].cacheCall();
    this.setState({tasksKey});
  }

  toggleDone = (id) => {
    const Todo = this.props.drizzle.contracts.ToDo;
    const txId = Todo
      .methods['toggleDone']
      .cacheSend(
        id,
        {
          from: this.props.drizzleState.accounts[0],
          gas: 200000
        }
      );
    this.setState({txId});
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
      <td>{task.dateComplete !== '0' ? formatDate(task.dateComplete) : ''}</td>
    </tr>
  );

  render() {
    const { ToDo } = this.props.drizzleState.contracts;
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.txId];
    const { tasksKey } = this.state;

    //Raw values from smart contract
    let _tasks = ToDo.getTasks[tasksKey];
    //Format these values into usable array of tasks
    const tasks = [];
    if(_tasks && _tasks.value) {
      for(let [i, _] of _tasks.value[0]) {
        const hexToUtf8 = this.props.drizzle.web3.utils.hexToUtf8;
        tasks.push({
          id: _tasks.value[0][i],
          date: _tasks.value[1][i],
          content: hexToUtf8(_tasks.value[2][i]), 
          author: hexToUtf8(_tasks.value[3][i]), 
          done: _tasks.value[4][i],
          dateComplete: _tasks.value[5][i]
         });
      }
    }
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
                {tasks && tasks.map((task) => this.renderTask(task))}
              </tbody>
            </table>
          </div>
          <p>
            {txHash ? `Transaction status: ${transactions[txHash] && transactions[txHash].status}` : null}
          </p>
        </div>
      </div>
    );
  }
};

export default withDrizzle(Tasks);
