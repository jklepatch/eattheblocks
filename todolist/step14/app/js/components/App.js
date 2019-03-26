import React, { Component, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import NewTask from './NewTask';
import Tasks from './Tasks';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      address: null,
      tasks: []
    };
    this.getTasks = this.getTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  async getTasks() {
    const { todo } = this.props;
    return await todo.methods.getTasks().call();
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
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <NewTask createTask={this.createTask} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Tasks tasks={tasks} toggleDone={this.toggleDone} />
            </div>
          </div>
        </div>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;
