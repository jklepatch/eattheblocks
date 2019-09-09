import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Escrow</h1>

        <div className="row">
          <div className="col-sm-12">
             <p>Balance: <b></b> wei </p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <form>
              <div className="form-group">
                <label htmlFor="deposit">Deposit</label>
                <input type="number" className="form-control" id="deposit" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-sm-12">
             <button type="submit" className="btn btn-primary">Release</button>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
