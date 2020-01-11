import React from "react";
import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from "@drizzle/react-plugin";

import drizzleOptions from "./drizzleOptions";
import LoadingContainer from './LoadingContainer.js';
import TokenMetadata from './TokenMetadata.js';
import TokenWallet from './TokenWallet.js';
import Admin from './Admin.js';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function App() {
  return (
    <div className="container">
      <h1>ERC721 Token</h1>
      <DrizzleProvider drizzle={drizzle}>
        <LoadingContainer>
          <TokenMetadata />
          <TokenWallet />
          <Admin />
        </LoadingContainer>
      </DrizzleProvider>
    </div>
  );
}

export default App;
