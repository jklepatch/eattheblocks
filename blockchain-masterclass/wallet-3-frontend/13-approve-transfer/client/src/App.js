import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils.js'; 
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);

  const isReady = () => {
    return typeof web3 !== 'undefined' 
      && typeof accounts !== 'undefined' 
      && typeof wallet !== 'undefined';
  }

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
    }
    init();
  }, []);

  useEffect(() => {
    const init = async() => {
      const approvers = await wallet.methods.getApprovers().call(); 
      const quorum = await wallet.methods.quorum().call(); 
      setApprovers(approvers);
      setQuorum(quorum);
    }
    if(isReady()) {
      init();
    }
  }, [web3, accounts, wallet]);

  const createTransfer = transfer => {
    wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({from: accounts[0], gas: 1000000});
  }

  if(!isReady()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Multisig Dapp 
      <Header approvers={approvers} quorum={quorum} />
      <NewTransfer createTransfer={createTransfer} />
    </div>
  );
}

export default App;
