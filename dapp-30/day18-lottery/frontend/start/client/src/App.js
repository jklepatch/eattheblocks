import React, { useEffect, useState } from 'react';
import Lottery from './contracts/Lottery.json';
import { getWeb3 } from './utils.js';

const states = ['IDLE', 'BETTING'];

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [bet, setBet] = useState(undefined);
  const [players, setPlayers] = useState([]);
  const [houseFee, setHouseFee] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Lottery.networks[networkId];
      const contract = new web3.eth.Contract(
        Lottery.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const [houseFee, state] = await Promise.all([
        contract.methods.houseFee().call(),
        contract.methods.currentState().call()
      ]);

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setHouseFee(houseFee);
      setBet({state: 0});
    }
    init();
    window.ethereum.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });
  }, []);

  const isReady = () => {
    return (
      typeof contract !== 'undefined' 
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof houseFee !== 'undefined'
    );
  }

  useEffect(() => {
    if(isReady()) {
      updateBet();
      updatePlayers();
    }
  }, [accounts, contract, web3, houseFee]);

  async function updateBet() {
  }

  async function updatePlayers() {
  }

  async function createBet(e) {
  };

  async function cancel() {
  };

  async function doBet() {
  };

  if(!bet || typeof bet.state === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Lottery</h1>

      <p>House Fee: {/* todo */} </p>
      <p>State: {/* todo */}</p>

      {/* display only if bet state is 1 */}
          <p>Bet size: {/* todo */}</p>
          <p>Bet count: { /* todo */}</p>
          <div>
            <h2>Players</h2>
            <ul>
              {/* display list of players */}
            </ul>
          </div>

      {/* display only if bet state is 0 */}
        <div className="row">
          <div className="col-sm-12">
            <h2>Create bet</h2>
            <form onSubmit={e => createBet(e)}>
              <div className="form-group">
                <label htmlFor="count">Count</label>
                <input type="text" className="form-control" id="count" />
              </div>
              <div className="form-group">
                <label htmlFor="size">Size</label>
                <input type="text" className="form-control" id="size" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

      {/* display only if bet state is 1 AND this is the admin */}
        <div className="row">
          <div className="col-sm-12">
            <h2>Cancel bet</h2>
              <button 
                onClick={e => cancel()}
                type="submit" 
                className="btn btn-primary"
              >
                Submit
              </button>
          </div>
        </div>

      {/* display only if bet state is 1 */}
        <div className="row">
          <div className="col-sm-12">
            <h2>Bet</h2>
              <button 
                onClick={e => doBet()}
                type="submit" 
                className="btn btn-primary"
              >
                Submit
              </button>
          </div>
        </div>
    </div>
  );
}

export default App;
