import React, { Component } from 'react';
import Fibonacci from './contracts/Fibonacci.json';
import { getWeb3 } from './utils.js';

class App extends Component {
  state = {
    web3: null,
    accounts: [],
    contract: null
  }

  componentDidMount = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    setInterval(async () => {
      const accounts = await web3.eth.getAccounts()
      if (accounts[0] !== this.state.accounts[0]) {
        this.setState({accounts});
      }
    }, 1000);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Fibonacci.networks[networkId];
    const contract = new web3.eth.Contract(
      Fibonacci.abi,
      deployedNetwork && deployedNetwork.address,
    );

    this.setState({ web3, accounts, contract });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <h1 className="text-center">Fibonacci</h1>

        <div className="row">
          <div className="col-sm-12">
            <form>
              <div className="form-group">
                <label htmlFor="number">Fibonacci sequence of</label>
                <input type="number" className="form-control" id="number" />
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
