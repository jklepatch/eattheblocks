import React, { useState, useEffect } from "react";
import { getWeb3, getContracts } from './utils.js';
import Header from './Header.js';
import Footer from './Footer.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  const [tokens, setTokens]  = useState([]);

  useEffect(() => {
    const init = async () => {
      const { web3, contracts } = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const rawTokens = await contracts.dex.methods.getTokens().call();
      const tokens = rawTokens.map((token, i) => {
        return {...token, symbol: web3.utils.hexToUtf8(token.symbol)};
      });
      setWeb3(web3);
      setContracts(contracts);
      setTokens(tokens);
    }
    init();
  }, []);

  const isReady = () => {
    return (
      typeof web3 !== 'undefined' 
      && typeof contracts !== 'undefined'
    );
  }

  if (!isReady()) {
    return <div>Loading...</div>;
  }

  return (
    <div id="app">
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first-col">
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
