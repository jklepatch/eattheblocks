import React, { useEffect, useState } from 'react';
import Voting from './contracts/Voting.json';
import { getWeb3 } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [ballots, setBallots] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const contract = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const admin = await contract.methods
        .admin()
        .call();

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setAdmin(admin);
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
      && typeof admin !== 'undefined'
    );
  }

  useEffect(() => {
    if(isReady()) {
      updateBallots();
    }
  }, [accounts, contract, web3, admin]);

  async function updateBallots() {
    const nextBallotId = parseInt(await contract.methods
      .nextBallotId()
      .call());

    const ballots = [];
    for(let i = 0; i < nextBallotId; i++) { 
      const [ballot, hasVoted] = await Promise.all([
        contract.methods.getBallot(i).call(),
        contract.methods.votes(accounts[0], i).call() 
      ]);
      ballots.push({...ballot, hasVoted});
    }
    setBallots(ballots);
  }

  async function createBallot(e) {
    e.preventDefault();
    const name = e.target.elements[0].value;
    const choices = e.target.elements[1].value.split(',');
    const duration = e.target.elements[2].value;
    await contract.methods
      .createBallot(name, choices, duration)
      .send({from: accounts[0]});
    await updateBallots();
  };

  async function addVoters(e) {
    e.preventDefault();
    const voters = e.target.elements[0].value.split(',');
    await contract.methods
      .addVoters(voters)
      .send({from: accounts[0]});
    //await updateCurrentTransfer();
  };

  async function vote(e, ballotId) {
    e.preventDefault();
    const select = e.target.elements[0];
    const choiceId = select.options[select.selectedIndex].value;
    await contract.methods
      .vote(ballotId, choiceId)
      .send({from: accounts[0]});
    await updateBallots();
  };

  function isFinished(ballot) {
    const now = new Date().getTime();
    const ballotEnd =  new Date(parseInt(ballot.end) * 1000);
    return (ballotEnd > now) > 0 ? false : true;
  }

  if (!isReady()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Voting</h1>

      {accounts[0].toLowerCase() === admin.toLowerCase() ? (
        <>
        <div className="row">
          <div className="col-sm-12">
            <h2>Create ballot</h2>
            <form onSubmit={e => createBallot(e)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="choices">Choices</label>
                <input type="text" className="form-control" id="choices" />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (s)</label>
                <input type="text" className="form-control" id="duration" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <hr/>
        </>
      ) : null}

      <div className="row">
        <div className="col-sm-12">
          <h2>Votes</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Votes</th>
                <th>Vote</th>
                <th>Ends on</th>
              </tr>
            </thead>
            <tbody>
              {ballots.map(ballot => (
                <tr key={ballot.id}>
                  <td>{ballot.id}</td>
                  <td>{ballot.name}</td>
                  <td>
                    <ul>
                    {ballot.choices.map(choice => (
                      <li key={choice.id}>
                        id: {choice.id}, 
                        name: {choice.name}, 
                        votes: {choice.votes}
                      </li>
                    ))}
                    </ul>
                  </td>
                  <td>
                    {isFinished(ballot) ? 'Vote finished' : (
                      ballot.hasVoted ? 'You already voted' : ( 
                      <form onSubmit={e => vote(e, ballot.id)}>
                        <div className="form-group">
                          <label htmlFor="choice">Choice</label>
                          <select className="form-control" id="choice">
                            {ballot.choices.map(choice => (
                              <option 
                                key={choice.id} 
                                value={choice.id}>
                                {choice.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button 
                          type="submit" 
                          className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    ))}
                  </td>
                  <td>
                    {(new Date(parseInt(ballot.end) * 1000)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
