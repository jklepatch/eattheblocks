import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

import logo from "./logo.png";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData, ContractData, ContractForm } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);
  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Drizzle Examples</h1>
        <p>Examples of how to get started with Drizzle in various situations.</p>
      </div>
      <AccountData
        drizzle={drizzle}
        drizzleState={state}
        accounts={state.accounts}
        accountIndex={1}
      />
      <ContractData
        drizzle={drizzle}
        drizzleState={state}
        contract="SimpleStorage"
        method="storedData"
      />
      <ContractForm
        drizzle={drizzle}
        contract="SimpleStorage"
        method="set"
      />
    </div>
  );
};
