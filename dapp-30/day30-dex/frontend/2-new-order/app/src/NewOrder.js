import React, { useState } from 'react';

const TYPE = {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET'
};

const SIDE = {
  BUY: 0,
  SELL: 1
};

function NewOrder({createMarketOrder, createLimitOrder}) {
  const [order, setOrder] = useState({
    type: TYPE.LIMIT,
    side: SIDE.BUY,
    amount: '',
    price: ''
  });
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(type === TYPE.MARKET) {
      createMarketOrder(amount, price, side);
    } else {
      createLimitOrder(amount, price, side);
    }
  }

  return (
    <div id="orders" className="card">
      <h2 className="card-title">New Order</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group row">
          <label htmlFor="type" className="col-sm-4 col-form-label">Type</label>
          <div className="col-sm-8">
            <div id="type" className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn btn-secondary ${type === TYPE.LIMIT ? 'active' : ''}`}
                onClick={() => setOrder(order => { ...order, type: TYPE.LIMIT})}
              >Limit</button>
              <button 
                type="button" 
                className={`btn btn-secondary ${type === TYPE.MARKET ? 'active' : ''}`}
                onClick={() => setOrder(order => { ...order, type: TYPE.MARKET})}
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
                onClick={() => setOrder(order => { ...order, side:  SIDE.BUY})}
              >Buy</button>
              <button 
                type="button" 
                className={`btn btn-secondary ${side === SIDE.SELL ? 'active' : ''}`}
                onClick={() => setOrder(order => { ...order, side:  SIDE.SELL})}
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
              onChange={e => setOrder(order => { ...order, amount: e.target.value})}
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
                onChange={e => setOrder(order => { ...order, price: e.target.value})}
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

export default NewOrder;
