import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);
  return (
    <div className="App">
      <div>
        <h2>Token</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="token"
        />
      </div>
      <div>
        <h2>End</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="end"
          render={end => {
            if(!end) return 0;
            return (new Date(parseInt(end) * 1000)).toLocaleString();
          }}
        />
      </div>
      <div>
        <h2>Price (eth)</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="price"
        />
      </div>
      <div>
        <h2>Min purchase</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="minPurchase"
        />
      </div>
      <div>
        <h2>Max purchase</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="maxPurchase"
        />
      </div>
      <div>
        <h2>Available tokens</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="availableTokens"
        />
      </div>
      <div>
        <h2>Released</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="released"
        />
      </div>
      <div>
        <h2>Admin</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="ICO"
          method="admin"
        />
      </div>
    </div>
  );
};
