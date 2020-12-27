import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';
import { ethers } from 'ethers';

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [myContract, setMyContract] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [txPending, setTxPending] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { provider, signerAddress, myContract } = await getBlockchain();
      const data = await myContract.data();
      setProvider(provider);
      setSignerAddress(signerAddress);
      setMyContract(myContract);
      setData(data);
    };
    init();
  }, []);

  const updateData = async e => {
    e.preventDefault();
    const newData = e.target.elements[0].value;
    const tx = await myContract.setData(newData);
    setTxPending(true);
    localStorage.setItem('pendingTx', JSON.stringify({
      hash: tx.hash, 
      nonce: tx.nonce, 
      gasPrice: tx.gasPrice.add('1').toString() 
    }));
    await tx.wait();
    setTxPending(false);
    localStorage.clear();
  }

  const cancel = async () => {
    let pendingTx = localStorage.getItem('pendingTx');
    if(pendingTx) {
      pendingTx = JSON.parse(pendingTx);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        from: signerAddress,
        to: signerAddress,
        value: 0, 
        nonce: pendingTx.nonce, // Metamask ignore the nonce :(
        gasPrice: ethers.BigNumber.from(pendingTx.gasPrice)
      });
      await tx.wait();
      setTxPending(false);
      localStorage.clear();
    }
  }

  if(
    typeof provider === 'undefined'
    || typeof provider === 'undefined'
    || typeof myContract === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div>
      <p>Current value of data: {data && data.toString()}</p>
      <h2>New value</h2>
      <form onSubmit={e => updateData(e)}>
        <input type="text"/>
        <button type="submit">Submit</button>
      </form>
      {txPending ? <button type='submit' onClick={cancel}>Cancel</button> : null}
    </div>
  );
}

export default App;
