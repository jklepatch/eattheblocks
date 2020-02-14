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
      <div>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Ebay"
          method="auctions"
          methodArgs={[auctionId]}
          render={auction => {
            return (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{auction.name}</h5>
                  <p className="card-text">{auction.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Best offer</strong>: {auction.bestOffer}
                  </li>
                  <li className="list-group-item">
                    <strong>End</strong>: {toDate(auction.end)}
                  </li>
                  <li className="list-group-item">
                    <strong>Seller</strong>: {auction.seller}
                  </li>
                </ul>
              </div>
            );
          }}
        />
      </div>
    {/*
      <div>
        <h3>Create offer</h3>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Ebay"
          method="createOffer"
          methodArgs={[auctionId]}
        />
      </div>
      */}
    </>
  );
};
