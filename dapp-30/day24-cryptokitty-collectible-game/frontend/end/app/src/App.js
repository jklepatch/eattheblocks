import React from "react";
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from "@drizzle/react-plugin";

import drizzleOptions from "./drizzleOptions";
import LoadingContainer from './LoadingContainer.js';
import Catalogue from './Catalogue.js';
import Player from './Player.js';
import Admin from './Admin.js';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <div className="container">
      <h1>Cryptokitty</h1>
      <DrizzleProvider drizzle={drizzle}>
        <LoadingContainer>
          <Catalogue />
          <Player />
          <Admin />
        </LoadingContainer>
      </DrizzleProvider>
    </div>
  );
}

export default App;
