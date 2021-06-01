import { useState } from 'react';
import Head from 'next/head'
import axios from 'axios';

export default function Admin() {
  const [message, setMessage] = useState({
    payload: undefined, 
    type: undefined
  });
  const createPoll = async e => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    //midnight (beginning of day), in UTC
    const end = (new Date(e.target.elements[1].value)).getTime();
    const proposals = e.target.elements[2].value;
    const password = e.target.elements[3].value;
    setMessage({payload: 'Creating poll...', type: 'primary'});
    try {
      const response = await axios.post(
        '/api/create-poll', 
        {
          name,
          end,
          proposals,
          password
        }
      );
      setMessage({payload: 'Poll created!', type: 'success'});
    } catch(e) {
      const error = e.response.data.error || e.message;
      setMessage({payload: error, type: 'danger'});
    }
  };
  return (
    <div className='container'>
      <Head>
        <title>Eat The Blocks DAO - Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mb-4 mt-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className='display-5 fw-bold text-center'>Eat The Blocks Dao / Admin</h1>
        </div>
      </div>

      <div className='row'>
        <h2>Create new poll</h2>
        <form onSubmit={e => createPoll(e)}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input 
              id="name" 
              type="text" 
              className="form-control" 
              defaultValue="Next Youtube video"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end">End</label>
            <input 
              id="end" 
              type="date" 
              className="form-control" 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="proposals">Proposals</label>
            <input 
              type="text" 
              className="form-control" 
              id="proposals" 
              placeholder="Proposal 1, Proposal 2, etc..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input 
              type="text" 
              className="form-control" 
              id="password" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
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
    </div>
  );
}
