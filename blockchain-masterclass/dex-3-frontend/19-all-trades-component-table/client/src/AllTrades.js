import React from 'react';
import Moment from 'react-moment';

function AllTrades({trades}) {
  const renderList = (trades, className) => {
    return (
      <>
        <table className={`table table-striped trade-list mb-0 ${className}`}>
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.tradeId}>
                <td>{trade.amount}</td>
                <td>{trade.price}</td>
                <td>
                  <Moment fromNow>{parseInt(trade.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div className="card">
      <h2 className="card-title">All trades</h2>
      <div className="row">
        <div className="col-sm-12">
          {renderList(trades, 'trade-list')}
        </div>
      </div>
    </div>
  );
}

export default AllTrades;
