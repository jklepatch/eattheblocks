import React from "react";
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from "@drizzle/react-plugin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import drizzleOptions from "./drizzleOptions";
import LoadingContainer from './LoadingContainer.js';
import Navbar from './Navbar.js';
import AllTweets from './AllTweets.js';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <Router>
      <DrizzleProvider drizzle={drizzle}>
        <LoadingContainer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Navbar />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <Switch>
                  <Route exact path="/" component={AllTweets} />
                </Switch>
              </div>
            </div>
          </div>
        </LoadingContainer>
      </DrizzleProvider>
    </Router>
  );
}

export default App;
