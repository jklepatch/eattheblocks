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
    const bet = await Promise.all([
      contract.methods.betCount().call(),
      contract.methods.betSize().call(),
      contract.methods.admin().call(),
      contract.methods.currentState().call(),
    ]);
    setBet({count: bet[0], size: bet[1], admin: bet[2], state: parseInt(bet[3])});
  }

  async function updatePlayers() {
    const players = await contract.methods.getPlayers().call();
    setPlayers(players);
  }

  async function createBet(e) {
    e.preventDefault();
    const count = e.target.elements[0].value;
    const size = e.target.elements[1].value;
    await contract.methods
      .createBet(count, size)
      .send({from: accounts[0]});
    await updateBet();
  };

  async function cancel() {
    await contract.methods
      .cancel()
      .send({from: accounts[0]});
    await updateBet();
  };

  async function doBet() {
    await contract.methods
      .bet()
      .send({from: accounts[0], value: bet.size});
    await updateBet();
    await updatePlayers();
  };

  if(!bet || typeof bet.state === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Lottery</h1>

      <p>House Fee: {houseFee}</p>
      <p>State: {states[bet.state]}</p>
      {bet.state === 1 ? (
        <>
          <p>Bet size: {bet.size}</p>
          <p>Bet count: {bet.count}</p>
          <div>
            <h2>Players</h2>
            <ul>
              {players.map(player => <li key={player}>{player}</li>)}
            </ul>
          </div>
        </>
      ) : null}

      {bet.state === 0 ? (
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
      ) : null}

      {bet.state === 1 
       && accounts[0].toLowerCase() === bet.admin.toLowerCase() ? (
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
      ) : null}

      {bet.state === 1 ? (
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
      ) : null}
    </div>
  );
}

export default App;
