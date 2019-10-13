import React from 'react';

function App() {

  if (!web3) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">String manipulation</h1>

      <div className="row">
        <div className="col-sm-12">
          <h2>Length</h2>
          <form>
            <div className="form-group">
              <label htmlFor="string-length">String</label>
              <input type="text" className="form-control" id="string-length" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>{length && `Result: ${length}`}</p>
          </form>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12">
          <h2>Concatenate</h2>
          <form>
            <div className="form-group">
              <label htmlFor="string1">String 1</label>
              <input type="text" className="form-control" id="string1" />
            </div>
            <div className="form-group">
              <label htmlFor="string2">String 2</label>
              <input type="text" className="form-control" id="string2" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <p>{concatenation && `Result: ${concatenation}`}</p>
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
