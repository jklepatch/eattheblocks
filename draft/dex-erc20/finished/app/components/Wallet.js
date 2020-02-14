import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DIRECTION = {
  WIDTHDRAW: 'WIDTHDRAW',
  DEPOSIT: 'DEPOSIT'
};

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: DIRECTION.DEPOSIT,
      amount: 0
    };
  }

  onDirectionChange = (direction) => {
    this.setState({direction});
  }

  onAmountChange = (amount) => {
    this.setState({amount});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { amount, direction } = this.state;
    if(direction === DIRECTION.DEPOSIT) {
      this.props.deposit(amount);
    } else {
      this.props.withdraw(amount);
    }
  }

  render() {
    const { selection, user } = this.props;
    const { direction } = this.state;

    return (
      <div id="wallet" className="card">
        <h2 className="card-title">Wallet</h2>
        <h3>Token balance for {selection.token.symbol}</h3>
        <div className="form-group row">
          <label htmlFor="wallet" className="col-sm-4 col-form-label">Wallet</label>
          <div className="col-sm-8">
            <input 
              className="form-control" 
              id="wallet" 
              disabled 
              value={user.balances.tokenWallet}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="contract" className="col-sm-4 col-form-label">Dex</label>
          <div className="col-sm-8">
            <input 
              className="form-control" 
              id="wallet" 
              disabled 
              value={user.balances.tokenDex}
            />
          </div>
        </div>
        <h3>Transfer {selection.token.symbol}</h3>
        <form id="transfer" onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="direction" className="col-sm-4 col-form-label">Direction</label>
            <div className="col-sm-8">
              <div id="direction" className="btn-group" role="group">
                <button 
                  type="button" 
                  className={`btn btn-secondary ${direction === DIRECTION.DEPOSIT ? 'active' : ''}`}
                  onClick={() => this.onDirectionChange(DIRECTION.DEPOSIT)}
                >Deposit</button>
                <button 
                  type="button" 
                  className={`btn btn-secondary ${direction === DIRECTION.WIDTHDRAW ? 'active' : ''}`}
                  onClick={() => this.onDirectionChange(DIRECTION.WIDTHDRAW)}
                >Withdraw</button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-4 col-form-label">Amount</label>
            <div className="col-sm-8">
              <div className="input-group mb-3">
                <input 
                  id="amount" 
                  type="text" 
                  className="form-control" 
                  onChange={(e) => this.onAmountChange(e.target.value)}
                />
                <div className="input-group-append">
                  <span className="input-group-text">{selection.token.symbol}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  selection: PropTypes.object,
  user: PropTypes.object,
  deposit: PropTypes.func.isRequired,
  withdraw: PropTypes.func.isRequired
};

export default Wallet;
