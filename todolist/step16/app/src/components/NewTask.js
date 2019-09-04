import React, { Component } from 'react';
import withDrizzle from './DrizzleContainer';

class NewTask extends Component {
  state = {
    content: '',
    author: '',
    txId: null
  }

  handleChange = (field, e) => {
    this.setState({[field]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    let { content, author } = this.state;
    const { ToDo } = this.props.drizzle.contracts;
    content = drizzle.web3.utils.utf8ToHex(content);
    author = drizzle.web3.utils.utf8ToHex(author);
    const txId = ToDo
      .methods['createTask']
      .cacheSend(content, author, {
        from: drizzleState.accounts[0],
        gas: 200000
      });
    this.setState({txId});
  }

  render() {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.txId];
    return (
      <div className="card">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="orange">Create Task</h2>
          </div>
        </div>
        <div className="row">
          <form id="new-task" className="col-sm-12" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="task-content">Content</label>
              <input 
                id="task-content" 
                type="text" 
                className="form-control" 
                onChange={(e) => this.handleChange('content', e)} />
            </div>
            <div className="form-group">
              <label htmlFor="task-author">Author</label>
              <input 
                id="task-author" 
                type="text" 
                className="form-control" 
                onChange={(e) => this.handleChange('author', e)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <p>
            {txHash ? `Transaction status: ${transactions[txHash] && transactions[txHash].status}` : null}
          </p>
        </div>
      </div>
    );
  }
}

export default withDrizzle(NewTask);
