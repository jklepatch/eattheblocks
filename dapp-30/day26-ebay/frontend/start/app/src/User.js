import React, { useState, useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import { Link } from "react-router-dom";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);

  return (
    <>
      <div>
        <h3>User offers</h3>
      </div>
    </>
  );
};
