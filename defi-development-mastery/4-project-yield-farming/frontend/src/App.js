import { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';
import addresses from './addresses.js';
import { ethers } from 'ethers';

function App() {
  const [yieldFarmer, setYieldFarmer] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { signerAddress, yieldFarmer, dai } = await getBlockchain();
      setYieldFarmer(yieldFarmer);
      setDai(dai);
    };
    init();
  }, []);

  const openPosition = async e => {
    e.preventDefault();
    const amountProvided = ethers.utils.parseUnits(e.target.elements[0].value, 18);
    const amountBorrowed = ethers.utils.parseUnits(e.target.elements[1].value, 18);
    const tx1 = await dai.approve(yieldFarmer.address, amountProvided.add('2'));
    await tx1.wait();
    const tx2 = await yieldFarmer.openPosition(
      addresses.solo, 
      addresses.dai, 
      addresses.cDai,
      amountProvided, 
      amountBorrowed
    );
    await tx2.wait();
  };

  const closePosition = async e => {
    e.preventDefault();
    const tx1 = await dai.approve(yieldFarmer.address, '2');
    await tx1.wait();
    const tx2 = await yieldFarmer.closePosition(
      addresses.solo, 
      addresses.dai, 
      addresses.cDai
    );
    await tx2.wait();
  };

  if(
    typeof yieldFarmer === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div className='container'>

      <div className='row'>
        <div className='col-sm-12'>
          <h1 className='text-center'>Yield Farmer</h1>
          <div className="jumbotron">
            <h1 className="display-4 text-center">Yield Farm COMP tokens on Compound with leverage</h1>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6'>
          <h5>Open Position</h5>
          <form className="form-inline" onSubmit={e => openPosition(e)}>
            <input 
              type="text" 
              className="form-control mb-2 mr-sm-2" 
              placeholder="Amount provided (DAI)"
            />
            <input 
              type="text" 
              className="form-control mb-2 mr-sm-2" 
              placeholder="Amount borrowed (DAI)"
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
          <h5>Close Position</h5>
          <form className="form-inline" onSubmit={e => closePosition(e)}>
            <button 
              type="submit" 
              className="btn btn-primary mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
