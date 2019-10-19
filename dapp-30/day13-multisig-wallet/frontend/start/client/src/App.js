import React, { useEffect, useState } from 'react';
import Multisig from './contracts/Multisig.json';
import { getWeb3 } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Multisig.networks[networkId];
      const contract = new web3.eth.Contract(
        Multisig.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
    }
    init();
  }, []);

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Multisig</h1>

      <div className="row">
        <div className="col-sm-12">
           <p>Balance: <b></b> wei </p>
        </div>
      </div>

        <div className="row">
          <div className="col-sm-12">
            <h2>Create transfer</h2>
            <form>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" className="form-control" id="amount" />
              </div>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input type="text" className="form-control" id="to" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h2>Approve transfer</h2>
            <ul>
              <li>TransferId:</li>
              <li>Amount:</li>
              <li>Approvals:</li>
            </ul>
            <button 
              type="submit" 
              className="btn btn-primary"
            >Submit</button>
          </div>
        </div>
    </div>
  );
}

export default App;
