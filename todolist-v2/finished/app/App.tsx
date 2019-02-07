import * as React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewTask from './components/NewTask';
import TaskList from './components/TaskList';
import Web3 from 'web3';
import { Task, Todo } from './types';
import Web3CoreT = require('web3-core');
import ContractT = require('web3-eth-contract');


interface AppProps { web3: Web3, todo: ContractT.Contract };
interface AppState { accounts: string[], tasks: Task[] };

const initialState: AppState = {
  accounts: [],
  tasks: []
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const accounts = await this.props.web3.eth.getAccounts();
    const tasks = await this.getTasks();
    console.log(tasks);
    this.setState({accounts, tasks});
  }

  createTask = async (content: string, author: string) => {
    const receipt: ContractT.Contract = await this.props.todo.methods
      .createTask(content, author)
      .send({from: this.state.accounts[0], gas: 200000});
    return receipt;
  }

  getTasks = async () => { 
    const receipt = await this.props.todo.methods
      .getTasks()
      .call({from: this.state.accounts[0], gas: 1000000})
    return receipt;
  }

  toggleDone = (id: string) => {}

  render() {
    const { todo } = this.props;
    return (
      <React.Fragment>
        <Header address={todo.options.address} />
        <NewTask createTask={this.createTask} />
        <TaskList tasks={this.state.tasks} toggleDone={this.toggleDone} />
        <Footer />
      </React.Fragment>
    );
    }
}

export default App;

{/*
import React, { Component, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      address: null,
      tasks: [],
    };
    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  async getTasks() {
    const { todo } = this.props;
    const taskIds = await todo.methods.getTaskIds().call();
    const promises = [];
    taskIds.forEach((taskId) => {
        promises.push(todo.methods.getTask(taskId).call());
    });
    return await Promise.all(promises);
  }

  async createTask(content, author) {
    const { todo } = this.props;
    const receipt = await todo.methods
      .createTask(content, author)
      .send({
        from: this.state.accounts[0],
        gas: 1000000
      });
    console.log(receipt);
    const tasks = await this.getTasks();
    this.setState({tasks});
  }

  async toggleDone(id) {
    const { todo } = this.props;
    const receipt = await todo.methods
      .toggleDone(id)
      .send({
        from: this.state.accounts[0],
        gas: 1000000
      });
    console.log(receipt);
    const tasks = await this.getTasks();
    this.setState({tasks});
  }

  async componentDidMount(){
    const { web3, todo } = this.props;
    const accounts = await web3.eth.getAccounts();
    const tasks = await this.getTasks();
    this.setState({ 
      accounts,
      address: todo.options.address, 
      tasks
    });
  }

  render() {
    const { accounts, address, tasks } = this.state;

    if(accounts.length === 0) return <div>Loading...</div>;
    return (
      <Fragment>
        <Header address={address} />
        <Main 
          tasks={tasks} 
          createTask={this.createTask} 
          toggleDone={this.toggleDone} 
        />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
*/}
