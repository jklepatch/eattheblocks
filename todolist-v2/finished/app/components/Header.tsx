import * as React from 'react';

const Header = ({ address } : { address: string }) => {
  return (
    <div id="page-header" className="row">
      <div className="col-sm-12">
        <h1 className="text-center">ETB Ethereum ToDo List App <br />
          <span className="small">Address: {address}</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
