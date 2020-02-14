import React from "react";
import { Link } from "react-router-dom";
import { toDate } from "./utils.js";

export default (auctions) => (
  auctions && auctions.length > 0 ? (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">End</th>
          <th scope="col">Link</th>
        </tr>
      </thead>
      <tbody>
        {auctions.map(auction => (
          <tr key={auction.id}>
            <td>{auction.id}</td>
            <td>{auction.name}</td>
            <td>{toDate(auction.end)}</td>
            <td><Link to={`/auctions/${auction.id}`}>Link</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : <p>No auction yet</p>
);
