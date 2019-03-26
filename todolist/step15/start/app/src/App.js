import React, { Fragment } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div>@TODO: NewTask</div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div>@TODO: Tasks</div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default App;
