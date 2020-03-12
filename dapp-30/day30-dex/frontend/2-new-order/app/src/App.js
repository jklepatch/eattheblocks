import React, { useState, useEffect } from "react";
import { getWeb3, getContracts } from './utils.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Wallet from './Wallet.js';
import NewOrder from './NewOrder.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  const [tokens, setTokens]  = useState([]);
  const [user, setUser] = useState({
    accounts: [], 
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    },
    selectedToken: undefined
  });

  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.methods
      .balanceOf(account, web3.utils.fromAscii(token.symbol))
      .call();
    const tokenWallet = await contracts[token.symbol].methods
      .balanceOf(account)
      .call();
    return {tokenDex, tokenWallet};
  }

  const selectToken = async token => {
    const balances = await getBalances(accounts[0], token);
    setUser(user => { ...user, { balances, selectedToken: token}});
  }

  const deposit = async amount => {
    await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(user.selectedToken.symbol))
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => { ...user, balances});
  }

  const withdraw = async amount => {
    await contracts.dex.methods
      .withdraw(
        amount, 
        web3.utils.fromAscii(user.selectedToken.symbol)
      )
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => { ...user, balances});
  }

  const createMarketOrder = async (amount, price, side) => {
    await contracts.dex.methods
      .createMarketOrder(
        web3.utils.fromAscii(user.selectedToken.symbol),
        amount,
        price,
        side
      )
      .send({from: user.accounts[0]});
  }

  const createLimitOrder = async (amount, price, side) => {
    await contracts.dex.methods
      .createLimitOrder(
        web3.utils.fromAscii(user.selectedToken.symbol),
        amount,
        price,
        side
      )
      .send({from: user.accounts[0]});
  }

  useEffect(() => {
    const init = async () => {
      const { web3, contracts } = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const rawTokens = await contracts.dex.methods.getTokens().call();
      const tokens = rawTokens.map((token, i) => {
        return {...token, symbol: web3.utils.hexToUtf8(token.symbol)};
      });
      const balances = await getBalances(accounts[0], tokens[0]);
      setWeb3(web3);
      setContracts(contracts);
      setTokens(tokens);
      setUser({accounts, balances, selectedToken: tokens[0]});
    }
    init();
  }, []);

  const isReady = () => {
    return (
      typeof web3 !== 'undefined' 
      && typeof contracts !== 'undefined'
      && typeof user.selectedToken !== 'undefined'
    );
  }

  if (!isReady()) {
    return <div>Loading...</div>;
  }

  return (
    <div id="app">
      <Header 
        contracts={contracts}
        tokens={tokens}
        user={user}
        selectToken={selectToken}
      />
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first-col">
            <NewOrder 
              createMarketOrder={createMarketOrder}
              createLimitOrder={createLimitOrder}
            />
            <Wallet 
              user={user}
              deposit={deposit}
              withdraw={withdraw}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
