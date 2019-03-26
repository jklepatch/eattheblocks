import React from 'react';
import withDrizzle from './DrizzleContainer.js';

const Header = (props) => {
  return (
    <div id="page-header" className="row">
      <div className="col-sm-12">
        <h1 className="text-center">ETB Ethereum ToDo List App <br />
        <span className="small">Address: {props.drizzle.contracts.ToDo.address}</span>
        </h1>
      </div>
    </div>
  );
};

export default withDrizzle(Header);
