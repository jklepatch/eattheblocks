import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import AuctionList from "./AuctionList";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  //customize auction listing with list of links to auctions
  return (
    <>
      <div>
        <h3>All auctions</h3>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Ebay"
          method="getAuctions"
          render={AuctionList}
        />
      </div>
    </>
  );
};
