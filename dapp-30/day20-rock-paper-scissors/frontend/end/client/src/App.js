import React, { useEffect, useState } from 'react';
import RockPaperScissors from './contracts/RockPaperScissors.json';
import { getWeb3 } from './utils.js';

const states = ['IDLE', 'CREATED', 'JOINED', 'COMMITED', 'REVEALED'];

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [game, setGame] = useState({state: '0'});
  const [move, setMove] = useState();

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RockPaperScissors.networks[networkId];
      const contract = new web3.eth.Contract(
        RockPaperScissors.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
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
    );
  }

  useEffect(() => {
    if(isReady()) {
      updateGame();
    }
  }, [accounts, contract, web3]);

  async function updateGame() {
    let gameId = parseInt(await contract.methods.gameId().call());
    gameId = gameId > 0 ? gameId - 1 : gameId;
    const game = await contract.methods.getGame(gameId).call();
    setGame({id: game[0], bet: game[1], players: game[2], state: game[3]});
  }

  async function createGame(e) {
    e.preventDefault();
    const participant = e.target.elements[0].value;
    const bet = e.target.elements[1].value;
    await contract.methods
      .createGame(participant)
      .send({from: accounts[0], value: bet});
    await updateGame();
  };

  async function joinGame() {
    await contract.methods
      .joinGame(game.id)
      .send({from: accounts[0], value: game.bet});
    await updateGame();
  };

  async function commitMove(e) {
    e.preventDefault();
    const select = e.target.elements[0];
    const moveId = select.options[select.selectedIndex].value;
    const salt = Math.floor(Math.random() * 1000);  
    await contract.methods
      .commitMove(game.id, moveId, salt)
      .send({from: accounts[0]});
    setMove({id: moveId, salt});
    await updateGame();
  };

  async function revealMove() {
    await contract.methods
      .revealMove(game.id, move.id, move.salt)
      .send({from: accounts[0]});
    setMove(undefined);
    await updateGame();
  };

  if(typeof game.state === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Rock Paper Scissors</h1>

      <p>State: {states[game.state]}</p>
      {game.state === '1' ? (
        <>
          <p>Bet: {game.bet}</p>
          <div>
            <h2>Players</h2>
            <ul>
              {game.players.map(player => <li key={player}>{player}</li>)}
            </ul>
          </div>
        </>
      ) : null}

      {game.state === '0' ? (
        <div className="row">
          <div className="col-sm-12">
            <h2>Create Game</h2>
            <form onSubmit={e => createGame(e)}>
              <div className="form-group">
                <label htmlFor="participant">Participant</label>
                <input type="text" className="form-control" id="participant" />
              </div>
              <div className="form-group">
                <label htmlFor="bet">Bet</label>
                <input type="text" className="form-control" id="bet" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      ) : null}

      {game.state === '1' 
       && game.players[1].toLowerCase() === accounts[0].toLowerCase() ? (
        <div className="row">
          <div className="col-sm-12">
            <h2>Bet</h2>
              <button 
                onClick={e => joinGame()}
                type="submit" 
                className="btn btn-primary"
              >
                Submit
              </button>
          </div>
        </div>
      ) : null}

      {game.state === '2' ? (
        <div className="row">
          <div className="col-sm-12">
            <h2>Commit move</h2>
            <form onSubmit={e => commitMove(e)}>
              <div className="form-group">
                <label htmlFor="move">Move</label>
                <select className="form-control" id="move">
                  <option value="1">Rock</option>
                  <option value="2">Paper</option>
                  <option value="3">Scissors</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      ) : null}

      {game.state === '3' ? (
        <div className="row">
          <div className="col-sm-12">
            <h2>Reveal move</h2>
            <button 
              onClick={() => revealMove()}
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
