import React, { useEffect, useState } from 'react';
import Strings from './contracts/Strings.json';
import { getWeb3 } from './utils.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [length, setLength] = useState(undefined);
  const [concatenation, setConcatenation] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Strings.networks[networkId];
      const contract = new web3.eth.Contract(
        Strings.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setContract(contract);
    }
    init();
  }, []);

  async function calculateLength(e) {
    e.preventDefault();
    const length = await contract.methods
      .length(e.target.elements[0].value)
      .call();
    setLength(length);
  }

  async function concatenate(e) {
    e.preventDefault();
    const concatenation = await contract.methods
      .concatenate(
        e.target.elements[0].value, 
        e.target.elements[1].value
      )
      .call();
    setConcatenation(concatenation);
  }

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">String manipulation</h1>

      <div className="row">
        <div className="col-sm-12">
          <h2>Length</h2>
          <form onSubmit={e => calculateLength(e)}>
            <div className="form-group">
              <label htmlFor="string-length">String</label>
              <input type="text" className="form-control" id="string-length" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>{length && `Result: ${length}`}</p>
          </form>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12">
          <h2>Concatenate</h2>
          <form onSubmit={e => concatenate(e)}>
            <div className="form-group">
              <label htmlFor="string1">String 1</label>
              <input type="text" className="form-control" id="string1" />
            </div>
            <div className="form-group">
              <label htmlFor="string2">String 2</label>
              <input type="text" className="form-control" id="string2" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>{concatenation && `Result: ${concatenation}`}</p>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
