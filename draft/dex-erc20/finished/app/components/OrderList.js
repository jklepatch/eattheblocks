import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class OrderList extends Component {
  renderList(orders, side, className) {
    return (
      <Fragment>
        <table className={`table table-striped mb-0 order-list ${className}`}>
          <thead>
            <tr className="table-title order-list-title">
              <th colSpan='3'>{side}</th>
            </tr>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.amount}</td>
                <td>{order.price}</td>
                <td>
                  <Moment fromNow>{parseInt(order.date) * 1000}</Moment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
  render() {
    const { orders } = this.props;
    return (
      <div id="order-list" className="card">
        <h2 className="card-title">Orders</h2>
        <div className="row">
          <div className="col-sm-6">
            {this.renderList(orders.buy, 'Buy', 'order-list-buy')}
          </div>
          <div className="col-sm-6">
            {this.renderList(orders.sell, 'Sell', 'order-list-sell')}
          </div>
        </div>
      </div>
    );
  }
}

OrderList.propTypes = {
  orders: PropTypes.object
};

export default OrderList;
