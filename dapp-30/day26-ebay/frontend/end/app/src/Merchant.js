import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import AuctionList from "./AuctionList";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm, ContractData } = newContextComponents;

export default () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  return (
    <>
      <div>
        <h3>Create auction</h3>
        <ContractForm
          drizzle={drizzle}
          drizzleState={state}
          contract="Ebay"
          method="createAuction"
        />
      </div>
    <hr />
      <div>
        <h3>User auctions</h3>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Ebay"
          method="getUserAuctions"
          methodArgs={[state.accounts[0]]}
          render={AuctionList}
        />
      </div>
    </>
  );
};
