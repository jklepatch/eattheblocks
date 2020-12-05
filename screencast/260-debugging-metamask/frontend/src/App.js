import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';

function App() {
  const [myContract, setMyContract] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { myContract } = await getBlockchain();
      const data = await myContract.data();
      setMyContract(myContract);
      setData(data);
    };
    init();
  }, []);

  if(
    typeof myContract === 'undefined'
    || typeof data === 'undefined'
  ) {
    return 'Loading...';
  }

  const updateData = async e => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    await myContract.updateData(
      data,
    );
  };

  const willThrow = async e => {
    e.preventDefault();
    await myContract.willThrow();
  };

  return (
    <div className='container'>

      <div className='row'>
        <div className='col-sm-6'>
          <h2 className="card-title">updateData()</h2>
          <form className="form-inline" onSubmit={e => updateData(e)}>
            <input 
              type="text" 
              className="form-control mb-2 mr-sm-2" 
            />
            <button 
              type="submit" 
              className="btn btn-primary mb-2"
            >
              Submit
            </button>
          </form>
        </div>
        <div className='col-sm-6'>
          <h2 className="card-title">willThrow()</h2>
          <form className="form-inline" onSubmit={e => willThrow(e)}>
            <button 
              type="submit" 
              className="btn btn-primary mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <p>Data: {data && data.toString()}</p>
        </div>
      </div>

  </div>
  );
}

export default App;
