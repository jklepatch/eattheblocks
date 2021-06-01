import { useEffect, useState } from 'react';
import Head from 'next/head'
import axios from 'axios';
import getBlockchain from '../lib/ethereum.js';
import Poll from '../lib/Poll.js';

export default function Home() {
  const [web3, setWeb3] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [poll, setPoll] = useState(undefined);
  const [selectedProposalId, setSelectedProposalId] = useState(undefined);
  const [message, setMessage] = useState({
    payload: 'loading', 
    type: 'primary'
  });

  useEffect(() => {
    const init = async () => {
      try {
        const { web3, address } = await getBlockchain();
        //const response = await axios.get('/api/get-latest-poll');
        const response = await axios.get('/api/get-latest-poll');
        //console.log(response);
        setWeb3(web3);
        setAddress(address);
        setPoll(response.data.poll);
        setSelectedProposalId(response.data.poll.proposals[0]._id);
        setMessage({payload: undefined, type: undefined});
        //console.log(response.data.poll);
        console.log(response.data.poll.proposals[0]);
      } catch(e) {
        console.log(e);
        setMessage({
          payload: `Ooops... There was a problem when loading the app: ${e}`, 
          type: 'danger'
        });
      }
    };
    init();
  }, []);

  const createVote = async e => {
    e.preventDefault();
    //console.log(e.target.elements);
    console.log(selectedProposalId);
    const response = await axios.post('/api/create-vote', {
      address,
      pollId: poll._id,
      proposalId: selectedProposalId
    });
    console.log(response);
  };

  return (
    <div className='container'>
      <Head>
        <title>Eat The Blocks DAO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mb-4 mt-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className='display-5 fw-bold text-center'>Eat The Blocks Dao</h1>
        </div>
      </div>

      {typeof message.payload === 'undefined' ? null : (
        <div className='row'>
          <div className='col'>
            <div className={`mt-4 alert alert-${message.type}`} role="alert">
              {message.payload}
            </div>
          </div>
        </div>
      )}

      {typeof poll === 'undefined' ? null : (
        <Poll poll={poll} />
      )}

      {typeof poll === 'undefined' 
        || typeof selectedProposalId === 'undefined' ? null : (
        <div className='row'>
          <div className='col'>
            <div className="card">
              <h5 className="card-header">{poll.name}</h5>
              <div className="card-body">
                <h5 className="card-title">
                  Vote ends on {(new Date(parseInt(poll.end))).toLocaleString()}
                </h5>
                <p className="card-text">Vote for your favorite proposal:</p>
                <form onSubmit={e => createVote(e)}>
                  {poll.proposals.map(proposal => (
                    <div className="form-check" key={proposal._id}> 
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name='proposal'
                        value={proposal._id}
                        id={proposal._id}
                        onChange={e => setSelectedProposalId(e.target.value)} 
                        checked={proposal._id === selectedProposalId ? true : false}
                      />
                      <label className="form-check-label" htmlFor={proposal._id}>
                        {proposal.name}
                      </label>
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
