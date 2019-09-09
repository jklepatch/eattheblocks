import React, { Component } from 'react';
import Strings from './contracts/Strings.json';
import { getWeb3 } from './utils.js';

class App extends Component {
  state = {
    web3: null,
    accounts: [],
    contract: null,
    length: null,
    concatenation: null
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
    const deployedNetwork = Strings.networks[networkId];
    const contract = new web3.eth.Contract(
      Strings.abi,
      deployedNetwork && deployedNetwork.address,
    );

    this.setState({ web3, accounts, contract });
  };

  length = async e => {
    e.preventDefault();
    const { contract } = this.state;
    const length = await contract.methods
      .length(e.target.elements[0].value)
      .call();
    this.setState({length});
  }

  concatenate = async e => {
    e.preventDefault();
    const { contract } = this.state;
    const concatenation = await contract.methods
      .concatenate(
        e.target.elements[0].value, 
        e.target.elements[1].value
      )
      .call();
    this.setState({concatenation});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }

    const { length, concatenation } = this.state;

    return (
      <div className="container">
        <h1 className="text-center">String manipulation</h1>

        <div className="row">
          <div className="col-sm-12">
            <h2>Length</h2>
            <form onSubmit={e => this.length(e)}>
              <div className="form-group">
                <label htmlFor="string-length">String</label>
                <input type="text" className="form-control" id="string-length" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <p>{length && `Result: ${length}`}</p>
            </form>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-sm-12">
            <h2>Concatenate</h2>
            <form onSubmit={e => this.concatenate(e)}>
              <div className="form-group">
                <label htmlFor="string1">String 1</label>
                <input type="text" className="form-control" id="string1" />
              </div>
              <div className="form-group">
                <label htmlFor="string2">String 2</label>
                <input type="text" className="form-control" id="string2" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <p>{concatenation && `Result: ${concatenation}`}</p>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
