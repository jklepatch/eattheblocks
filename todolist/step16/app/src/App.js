import React, { Fragment } from 'react';
import { Drizzle, generateStore } from '@drizzle/store';
import { DrizzleContext } from '@drizzle/react-plugin';
import drizzleOptions from './drizzleOptions';
import LoadingComponent from './components/LoadingComponent';
import Header from './components/Header';
import Footer from './components/Footer';
import NewTask from './components/NewTask';
import Tasks from './components/Tasks';

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
                <NewTask />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Tasks />
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
