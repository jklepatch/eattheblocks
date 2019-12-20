import React from "react";
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from "@drizzle/react-plugin";

import drizzleOptions from "./drizzleOptions";
import LoadingContainer from './LoadingContainer.js';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <div className="container">
      <h1>ICO</h1>
      <DrizzleProvider drizzle={drizzle}>
        <LoadingContainer>
          <p>Loaded...</p>
        </LoadingContainer>
      </DrizzleProvider>
    </div>
  );
}

export default App;
