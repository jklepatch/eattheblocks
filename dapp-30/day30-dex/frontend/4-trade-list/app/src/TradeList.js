import React, { Fragment } from 'react';
import Moment from 'react-moment';

function TradeList({trades}) {
  const renderList = (trades, className) => {
    return (
      <Fragment>
        <table className={`table table-striped mb-0 ${className}`}>
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.amount}</td>
                <td>{trade.price}</td>
                <td>
                  <Moment fromNow>{parseInt(trade.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
  return (
    <div id="trade-list" className="card">
      <h2 className="card-title">Trades</h2>
      <div className="row">
        <div className="col-sm-12">
          {renderList(trades, 'trade-list')}
        </div>
      </div>
    </div>
  );
}

export default TradeList;
