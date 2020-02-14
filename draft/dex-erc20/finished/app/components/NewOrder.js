import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TYPE = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET'
};

const SIDE = {
  BUY: 0,
  SELL: 1
};

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: TYPE.LIMIT,
      side: SIDE.BUY,
      amount: '',
      price: ''
    };
  }

  onTypeChange = (type) => {
    this.setState({type});
  }

  onSideChange = (side) => {
    this.setState({side});
  }

  onAmountChange = (amount) => {
    this.setState({amount});
  }

  onPriceChange = (price) => {
    this.setState({price});
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const { type, side, amount, price } = this.state;
    if(type === TYPE.MARKET) {
      this.props.addMarketOrder(amount, price, side);
    } else {
      this.props.addLimitOrder(amount, price, side);
    }
  }

  render() {
    const { type, side } = this.state;
    return (
      <div id="orders" className="card">
        <h2 className="card-title">New Order</h2>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="type" className="col-sm-4 col-form-label">Type</label>
            <div className="col-sm-8">
              <div id="type" className="btn-group" role="group">
                <button 
                  type="button" 
                  className={`btn btn-secondary ${type === TYPE.LIMIT ? 'active' : ''}`}
                  onClick={() => this.onTypeChange(TYPE.LIMIT)}
                >Limit</button>
                <button 
                  type="button" 
                  className={`btn btn-secondary ${type === TYPE.MARKET ? 'active' : ''}`}
                  onClick={() => this.onTypeChange(TYPE.MARKET)}
                >Market</button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="side" className="col-sm-4 col-form-label">Side</label>
            <div className="col-sm-8">
              <div id="side" className="btn-group" role="group">
                <button 
                  type="button" 
                  className={`btn btn-secondary ${side === SIDE.BUY ? 'active' : ''}`}
                  onClick={() => this.onSideChange(SIDE.BUY)}
                >Buy</button>
                <button 
                  type="button" 
                  className={`btn btn-secondary ${side === SIDE.SELL ? 'active' : ''}`}
                  onClick={() => this.onSideChange(SIDE.SELL)}
                >Sell</button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="order-amount">Amount</label>
            <div className="col-sm-8">
              <input 
                type="text" 
                className="form-control" 
                id="order-amount" 
                onChange={(e) => this.onAmountChange(e.target.value)}
              />
            </div>
          </div>
          {type === TYPE.MARKET ? null :
            <div className="form-group row">
              <label className="col-sm-4 col-form-label" htmlFor="order-amount">Price</label>
              <div className="col-sm-8">
                <input 
                  type="text" 
                  className="form-control" 
                  id="order-price" 
                  onChange={(e) => this.onPriceChange(e.target.value)}
                />
              </div>
            </div>
          }
          <div className="text-right">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

Orders.propTypes = {
  addMarketOrder: PropTypes.func.isRequired,
  addLimitOrder: PropTypes.func.isRequired
};

export default Orders;
