import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle } = drizzleReactHooks;
const { ContractForm } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();

  return (
    <>
      <div>
        <h3>New tweet</h3>
      </div>
    </>
  );
};
