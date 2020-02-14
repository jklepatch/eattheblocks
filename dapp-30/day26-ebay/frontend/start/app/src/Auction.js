import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import { toDate } from "./utils";
import { Link } from "react-router-dom";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { drizzle } = useDrizzle();
  const state = useDrizzleState(state => state);
  const { auctionId } = useParams();

  return (
    <>
      <nav aria-label="breadcrumb" style={{marginTop: "15px"}}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Auctions</Link></li>
          <li className="breadcrumb-item active">{auctionId}</li>
        </ol>
      </nav>
    </>
  );
};
