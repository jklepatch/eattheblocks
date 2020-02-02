import React from "react";
import { toDate } from './utils';

export default ({ tweets }) => (
  <div className="list-group">
    {tweets.map(tweet => (
      <div key={tweet.id} className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            {tweet.authorName} 
            <span style={{fontSize: '0.5em'}}> ({tweet.authorAddress})</span>
          </h5>
          <small>{toDate(tweet.createdAt)}</small>
        </div>
        <p className="mb-1">{tweet.content}</p>
      </div>
    ))}
  </div>
);
