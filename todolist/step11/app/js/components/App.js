import React, { Component, Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

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
    this.setState({ accounts, address: todo.options.address });
  }

  render() {
    const { accounts, address } = this.state;
    if(accounts.length === 0) return <div>Loading...</div>;
    return (
      <Fragment>
        <Header address={address} />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
