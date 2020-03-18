import React, { useState, useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import Wallet from './Wallet.js';
import NewOrder from './NewOrder.js';
import OrderList from './OrderList.js';
import TradeList from './TradeList.js';

const SIDE = {
  BUY: 0,
  SELL: 1
};

function App({web3, accounts, contracts}) {
  const [tokens, setTokens]  = useState([]);
  const [user, setUser] = useState({
    accounts: [], 
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    },
    selectedToken: undefined
  });
  const [orders, setOrders] = useState({
    buy: [],
    sell: []
  });
  const [trades, setTrades] = useState([]);

  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.methods
      .traderBalances(account, web3.utils.fromAscii(token.ticker))
      .call();
    const tokenWallet = await contracts[token.ticker].methods
      .balanceOf(account)
      .call();
    return {tokenDex, tokenWallet};
  }

  const getOrders = async token => {
    const orders = await Promise.all([
      contracts.dex.methods
        .getOrders(web3.utils.fromAscii(token.ticker), SIDE.BUY)
        .call(),
      contracts.dex.methods
        .getOrders(web3.utils.fromAscii(token.ticker), SIDE.SELL)
        .call(),
    ]);
    return {buy: orders[0], sell: orders[1]};
  }

  const getTrades = async token => {
    //@todo: make it work with events
    //contracts.dex.NewTrade(newTrade => setTrades(trades => [...trades, newTrade]));
    //const trades= await contracts.dex.methods
    //  .getTrades(web3.utils.fromAscii(token.ticker))
    //  .call();
    //return trades; 
    return [];
  }

  const selectToken = async token => {
    const [balances, orders, trades] = await Promise.all([
      getBalances(
        user.accounts[0], 
        token
      ),
      getOrders(token),
      getTrades(token)
    ]);
    setUser(user => ({ ...user, balances, selectedToken: token}));
    setOrders(orders);
    setTrades(trades);
  }

  const deposit = async amount => {
    await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(user.selectedToken.ticker))
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => ({ ...user, balances}));
  }

  const withdraw = async amount => {
    await contracts.dex.methods
      .withdraw(
        amount, 
        web3.utils.fromAscii(user.selectedToken.ticker)
      )
      .send({from: user.accounts[0]});
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => ({ ...user, balances}));
  }

  const createMarketOrder = async (amount, side) => {
    await contracts.dex.methods
      .createMarketOrder(
        web3.utils.fromAscii(user.selectedToken.ticker),
        amount,
        side
      )
      .send({from: user.accounts[0]});
    const orders = await getOrders(user.selectedToken);
    setOrders(orders);
  }

  const createLimitOrder = async (amount, price, side) => {
    await contracts.dex.methods
      .createLimitOrder(
        web3.utils.fromAscii(user.selectedToken.ticker),
        amount,
        price,
        side
      )
      .send({from: user.accounts[0]});
    const orders = await getOrders(user.selectedToken);
    setOrders(orders);
  }

  useEffect(() => {
    const init = async () => {
      const rawTokens = await contracts.dex.methods.getTokens().call();
      const tokens = rawTokens.map((token, i) => {
        return {...token, ticker: web3.utils.hexToUtf8(token.ticker)};
      });
      const [balances, orders, trades] = await Promise.all([
        getBalances(accounts[0], tokens[0]),
        getOrders(tokens[0]),
        getTrades(tokens[0])
      ]);
      setTokens(tokens);
      setUser({accounts, balances, selectedToken: tokens[0]});
      setOrders(orders);
      setTrades(trades);
    }
    init();
  // eslint-disable-next-line
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
            <Wallet 
              user={user}
              deposit={deposit}
              withdraw={withdraw}
            />
            {user.selectedToken.ticker !== 'DAI' ? (
              <NewOrder 
                createMarketOrder={createMarketOrder}
                createLimitOrder={createLimitOrder}
              />
            ) : null}
          </div>
          {user.selectedToken.ticker !== 'DAI' ? (
            <div className="col-sm-8">
                <OrderList 
                  orders={orders}
                />
                    {/*
                <TradeList 
                  trades={trades}
                />
                */}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
