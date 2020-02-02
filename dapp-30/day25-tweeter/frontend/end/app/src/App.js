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
import AllTweets from './AllTweets.js';
import MyTweets from './MyTweets.js';
import NewTweet from './NewTweet.js';
import Navbar from './Navbar.js';

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
                  <Route path="/my-tweets" component={MyTweets} />
                  <Route path="/new-tweet" component={NewTweet} />
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
