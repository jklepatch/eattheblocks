import * as React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewTask from './components/NewTask';
import TaskList from './components/TaskList';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import { Task, Todo } from './types';

interface AppProps { web3: Web3, todo: Contract.Contract };
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
    this.setState({accounts, tasks});
  }

  createTask = async (content: string, author: string) => {
    const receipt = await this.props.todo.methods
      .createTask(content, author)
      .send({from: this.state.accounts[0], gas: 200000});
    const tasks = await this.getTasks();
    this.setState({tasks});
    return receipt;
  }

  getTasks = async () => { 
    const receipt = await this.props.todo.methods
      .getTasks()
      .call({from: this.state.accounts[0], gas: 1000000})
    return receipt;
  }

  toggleDone = async (id: string) => {
    const receipt = await this.props.todo.methods
      .toggleDone(id)
      .send({from: this.state.accounts[0], gas: 1000000})
    const tasks = await this.getTasks();
    this.setState({tasks});
    return receipt;
  }

  render() {
    const { todo } = this.props;
    if(this.state.accounts.length === 0) return <div>Loading...</div>;
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
