import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import TweetList from "./TweetList";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  return (
    <>
      <div>
        <h3>All tweets</h3>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Tweeter"
          method="getLatestTweets"
          methodArgs={[5]}
          render={tweets => <TweetList tweets={tweets} />}
        />
      </div>
    </>
  );
};
