import { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';

function App() {
  const [yieldFarmer, setYieldFarmer] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { signerAddress, yieldFarmer } = await getBlockchain();
      setYieldFarmer(yieldFarmer);
    };
    init();
  }, []);

  const openPosition = async e => {
    e.preventDefault();
    //Send token first? if yes need to add this in getBlocckhain / state
    const tx = await yieldFarmer.openPosition();
    await tx.wait();
  };

  const closePosition = async e => {
    e.preventDefault();
    const tx = await yieldFarmer.closePosition();
    await tx.wait();
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
            <h1 className="display-4 text-center">Yielf Farm COMP tokens on Compound by re-investing borrows 5x</h1>
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
              placeholder="Position amount (DAI)"
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
