import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Wallet from './components/Wallet';
import NewOrder from './components/NewOrder';
import OrderList from './components/OrderList';
import TradeList from './components/TradeList';
import { web3, contracts } from './ethereum';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      user: {
        accounts: [], 
        balances: {
          tokenDex: 0,
          tokenWallet: 0
        }
      },
      selection: {
        account: '',
        token: {}
      },
      orders: {
        buy: [],
        sell: []
      },
      trades: []
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const rawTokens = await contracts.dex.methods.getTokens().call();
    const tokens = rawTokens.map((token, i) => {
      return {...token, symbol: web3.utils.hexToUtf8(token.symbol)};
    });
    const activeAccount = accounts[4];
    const activeToken = tokens[0];
    const balances = await this.getBalances(activeAccount, activeToken);
    const orders = await this.getOrders(activeToken);
    const trades = await this.getTrades(activeToken);
    this.setState({
      tokens,
      user: {
        accounts,
        balances
      },
      selection: {
        account: activeAccount,
        token: activeToken
      },
      orders,
      trades
    });
  }

  async getBalances(account, token) {
    const tokenDex = await contracts.dex.methods
      .balanceOf(account, web3.utils.fromAscii(token.symbol))
      .call();
    const tokenWallet = await contracts[token.symbol].methods
      .balanceOf(account)
      .call();
    return {tokenDex, tokenWallet};
  }

  async getOrders(token) {
    const orders = await contracts.dex.methods
      .getOrders(web3.utils.fromAscii(token.symbol))
      .call();
    return {buy: orders[0], sell: orders[1]};
  }

  async getTrades(token) {
    const trades= await contracts.dex.methods
      .getTrades(web3.utils.fromAscii(token.symbol))
      .call();
    return trades; 
  }

  selectAccount = async (account) => {
    const balances = await this.getBalances(
      account, 
      this.state.selection.token
    );
    this.setState({
      selection: { ...this.state.selection, account},
      user: {...this.state.user, balances}
    });
  }

  selectToken = async (token) => {
    const balances = await this.getBalances(
      this.state.selection.account, 
      token
    );
    const orders = await this.getOrders(token);
    const trades = await this.getTrades(token);
    this.setState({
      selection: { ...this.state.selection, token},
      user: {...this.state.user, balances},
      orders,
      trades
    });
  }

  deposit = async (amount) => {
    const { selection, user } = this.state;
    const receipt = await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(selection.token.symbol))
      .send({from: selection.account, gas: 200000});
    const balances = await this.getBalances(
      selection.account, 
      selection.token
    );
    this.setState({
      user: { ...user, balances},
    });
  }

  withdraw = async (amount) => {
    const { selection, user } = this.state;
    const receipt = await contracts.dex.methods
      .withdraw(
        amount, 
        web3.utils.fromAscii(selection.token.symbol), 
        selection.account
      )
      .send({from: selection.account, gas: 200000});
    const balances = await this.getBalances(
      selection.account, 
      selection.token
    );
    this.setState({
      user: { ...user, balances},
    });
  }

  addMarketOrder = async (amount, price, side) => {
    const { selection } = this.state;
    const receipt = await contracts.dex.methods
      .addMarketOrder(
        web3.utils.fromAscii(selection.token.symbol),
        amount,
        price,
        side
      )
      .send({from: selection.account, gas: 1000000});
    const orders = await this.getOrders(selection.token);
    this.setState({
      orders
    });
  }

  addLimitOrder = async (amount, price, side) => {
    const { selection } = this.state;
    const receipt = await contracts.dex.methods
      .addLimitOrder(
        web3.utils.fromAscii(selection.token.symbol),
        amount,
        price,
        side
      )
      .send({from: selection.account, gas: 1000000});
    const orders = await this.getOrders(selection.token);
    this.setState({
      orders
    });
  }

  render() {
    const { tokens, user, selection, orders, trades } = this.state;

    return (
      <div id="app">
        <Header 
          contracts={contracts}
          tokens={tokens}
          user={user}
          selection={selection}
          selectAccount={this.selectAccount}
          selectToken={this.selectToken}
        />
        <main className="container-fluid">
          <div className="row">
            <div className="col-sm-4 first-col">
              <NewOrder 
                addMarketOrder={this.addMarketOrder}
                addLimitOrder={this.addLimitOrder}
              />
              <Wallet 
                selection={selection}
                user={user}
                deposit={this.deposit}
                withdraw={this.withdraw}
              />
            </div>
            <div className="col-sm-8">
              <OrderList 
                orders={orders}
              />
              <TradeList 
                trades={trades}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
