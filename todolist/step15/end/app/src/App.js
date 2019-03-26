import React, { Fragment } from 'react';
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';
import drizzleOptions from './drizzleOptions';
import LoadingComponent from './components/LoadingComponent';
import Header from './components/Header';
import Footer from './components/Footer';

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
        <LoadingComponent>
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
        </LoadingComponent>
    </DrizzleContext.Provider>
  );
};

export default App;
