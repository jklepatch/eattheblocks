import React, { Component } from 'react';
import Multisig from './contracts/Multisig.json';
import { getWeb3 } from './utils.js';

class App extends Component {
  state = {
    web3: null,
    accounts: [],
    contract: null,
    balance: null
  }

  componentDidMount = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    setInterval(async () => {
      const accounts = await web3.eth.getAccounts()
      if (accounts[0] !== this.state.accounts[0]) {
        this.setState({accounts}, this.updateBalance);
      }
    }, 1000);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Multisig.networks[networkId];
    const contract = new web3.eth.Contract(
      Multisig.abi,
      deployedNetwork && deployedNetwork.address,
    );

    this.setState({ web3, accounts, contract }, this.updateBalance);
  };

  updateBalance = async () => {
    const { contract, web3 } = this.state;
    const balance = await web3.eth.getBalance(contract.options.address);
    this.setState({ balance });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }

    const { balance } = this.state;

    return (
      <div className="container">
        <h1 className="text-center">Multisig</h1>

        <div className="row">
          <div className="col-sm-12">
             <p>Balance: <b>{balance}</b> wei </p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h2>Create transfer</h2>
            <form>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" className="form-control" id="amount" />
              </div>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input type="text" className="form-control" id="to" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-sm-12">
            <h2>Send transfer</h2>
            <form>
              <div className="form-group">
                <label htmlFor="transfer-id">Transfer id</label>
                <input type="number" className="form-control" id="transfer-id" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
