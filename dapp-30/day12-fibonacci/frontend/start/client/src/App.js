import React, { useEffect, useState } from 'react';
import Fibonacci from './contracts/Fibonacci.json';
import { getWeb3 } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Fibonacci.networks[networkId];
      const contract = new web3.eth.Contract(
        Fibonacci.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setContract(contract);
    }
    init();
  }, []);
  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Fibonacci</h1>

      <div className="row">
        <div className="col-sm-12">
          <form>
            <div className="form-group">
              <label htmlFor="number">Fibonacci sequence of</label>
              <input type="number" className="form-control" id="number" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>{result && `Result: ${result}`}</p>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
