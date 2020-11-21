import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';


function App() {
  const [stakingPool, setStakingPool] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [amountInvested, setAmountInvested] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { signerAddress, stakingPool } = await getBlockchain();
      const amountInvested = await stakingPool.balances(signerAddress); 
      setStakingPool(stakingPool);
      setSignerAddress(signerAddress);
      setAmountInvested(amountInvested);
    };
    init();
  }, []);

  if(
    typeof stakingPool === 'undefined'
    || typeof signerAddress === 'undefined'
    || typeof amountInvested === 'undefined'
  ) {
    return 'Loading...';
  }

  const invest = async e => {
    e.preventDefault();
    await stakingPool.invest(
      {value: e.target.elements[0].value}
    );
    const amountInvested = await stakingPool.balances(signerAddress); 
    setAmountInvested(amountInvested);
  };

  return (
    <div className='container'>

      <div className='row'>
        <div className='col-sm-12'>
          <h1 className='text-center'>ETH 2.0 Staking Pool</h1>
          <div className="jumbotron">
            <h1 className="display-4 text-center">Become a validator in ETH 2.0 and earn between 5 to 20pct per year</h1>
            <p className="lead text-center">Your investment is pooled with other people. You can invest any amount, no need for 32 ETH normally required to run a validator by yourself.</p>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <h5 className="card-title">Invest</h5>
          <form className="form-inline" onSubmit={e => invest(e)}>
            <input 
              type="text" 
              className="form-control mb-2 mr-sm-2" 
              placeholder="Investment amount (ether)"
            />
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
        <h2>Your Investment: {amountInvested.toString()} ETH (wei)</h2>
      </div>
    </div>
  );
}

export default App;
