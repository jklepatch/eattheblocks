import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      address: null,
    };
  }

  async componentDidMount(){
    const { web3, todo } = this.props;
    const accounts = await web3.eth.getAccounts();
    this.setState({ accounts, address: todo.address });
  }

  render() {
    const { accounts, address } = this.state;
    if(accounts.length === 0) return <div>Loading...</div>;
    return <div>{accounts[0]}, {address}</div>;
  }
}

export default App;
