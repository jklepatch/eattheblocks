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
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Ebay"
          method="getUserOffers"
          methodArgs={[state.accounts[0]]}
          render={offers => {
            return (
              offers && offers.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Auction</th>
                      <th scope="col">Price</th>
                      <th scope="col">Link to auction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map(offer => (
                      <tr key={offer.id}>
                        <td>{offer.id}</td>
                        <td>{offer.auctionId}</td>
                        <td>{offer.price}</td>
                        <td>
                          <Link 
                            to={`/auctions/${offer.auctionId}`}
                          >
                            Link
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p>No offer yet</p>
            );
          }}
        />
      </div>
    </>
  );
};
