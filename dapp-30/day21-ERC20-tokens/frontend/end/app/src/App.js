import React, { Component } from "react";
import { Drizzle } from '@drizzle/store';
import { DrizzleContext } from "@drizzle/react-plugin";
import LoadingContainer from './LoadingContainer.js';

//import 'node_modules/bootstrap/dist/css/bootstrap.min.css';

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";
import TokenMetadata from './TokenMetadata.js';

const drizzle = new Drizzle(drizzleOptions);

function App() {
  return (
    <div className="container">
      <h1>ERC20 Token</h1>
      <DrizzleContext.Provider drizzle={drizzle}>
        <LoadingContainer>
          <TokenMetadata />
        </LoadingContainer>
      </DrizzleContext.Provider>
    </div>
  );
}

export default App;
