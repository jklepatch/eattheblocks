import React, { Component, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';
import NewTask from './NewTask';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      address: null,
      tasks: []
    };
    this.createTask = this.createTask.bind(this);
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
  }

  async componentDidMount(){
    const { web3, todo } = this.props;
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts, address: todo.options.address });
  }

  render() {
    const { accounts, address } = this.state;
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
        </div>
        <Footer/>
      </Fragment>
    );
  }
}

export default App;
