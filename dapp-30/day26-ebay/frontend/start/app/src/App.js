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
import Home from './Home.js';
import Auction from './Auction.js';
import Merchant from './Merchant.js';
import User from './User.js';
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
                  <Route exact path="/" component={Home} />
                  <Route path="/auctions/:auctionId" component={Auction} />
                  <Route path="/merchant" component={Merchant} />
                  <Route path="/user" component={User} />
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
