import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';
import AuctionList from './AuctionList';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [market, setMarket] = useState(undefined);
  const [nft, setNft] = useState(undefined);
  //const [auctions, setAuctions] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { provider, market } = await getBlockchain();
      //const auctions = await market.getAuctions();
      //setWeb3(web3);
      //const lastBlock = await ether
      //
      const fromBlock = await provider.getBlockNumber()
      await provider.resetEventsBlock(0);
      //const filter = {
      //  address: market.address,
      //  fromBlock: 0,
      //  toBlock: 'latest',
      //  topics: [market.filters.AuctionCreated().topics]
      //};
      //console.log(market.interface.events.AuctionCreated);
      //console.log(market.filters.AuctionCreated());
      //const logs = await provider.getLogs(filter);
      //console.log(logs);

      //console.log('setup auctions');
      market.on('AuctionCreated', (...data) => {
        //console.log('here');
        //console.log(data);
        //console.log('auctions in event listener');
        //console.log(auctions);
        //setAuctions(auctions + 1);
        setAuctions(auctions => ([
          ...auctions, 
          {
            tokenAddress: data[0],
            tokenId: data[1].toString(),
            seller: data[2],
            minBid: data[3].toString(),
            category: data[4].toString(),
            endDate: data[5].toString()
          }
        ]));
      });
      //address tokenAddress,
      //uint tokenId,
      //address seller,
      //uint minBid,
      //Categories category,
      //uint endDate
      setMarket(market);
      //setAuctions(auctions);
    };
    init();
  }, []);

  //if(auctions.length === 0defined') {
  //  return <div>Loading...</div>;
  //}

  return (
    <div>
      <h1>NFT Market</h1>
      <AuctionList auctions={auctions}></AuctionList>
      Hello world
    </div>

  );
}

export default App;
