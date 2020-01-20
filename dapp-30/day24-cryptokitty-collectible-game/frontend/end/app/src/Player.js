import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import KittyList from "./KittyList";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm, ContractData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  return (
    <div>
      <div>
        <h2>Breed</h2>
        <ContractForm
          drizzle={drizzle}
          contract="Cryptokitty"
          method="breed"
        />
      </div>
      <div>
        <h2>Player Kitties</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Cryptokitty"
          method="tokenURIBase"
          render={uriBase => {
            return (
              <ContractData
                drizzle={drizzle}
                drizzleState={state}
                contract="Cryptokitty"
                method="getAllKittiesOf"
                methodArgs={[state.accounts[0]]}
                render={kitties => (
                  <KittyList 
                    kitties={kitties} 
                    uriBase={uriBase}
                  /> 
                )}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
