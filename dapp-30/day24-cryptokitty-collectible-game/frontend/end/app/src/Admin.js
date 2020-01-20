import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

export default () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  useEffect(() => {
    const init = async () => {
      const admin = await drizzle.contracts.Cryptokitty.methods.admin().call();
      setIsAdmin(admin.toLowerCase() === state.accounts[0].toLowerCase());
    }
    init();
  });

  if(!isAdmin) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>Mint</h2>
        <ContractForm
          drizzle={drizzle}
          contract="Cryptokitty"
          method="mint"
        />
      </div>
    </div>
  );
};
