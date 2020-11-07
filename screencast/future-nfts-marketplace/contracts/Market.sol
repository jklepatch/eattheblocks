// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract Market {
  enum Categories {ART, GAME, DEFI}
  struct Auction {
    address payable seller;
    uint minBid;
    Categories category;
    uint endDate;
    address payable highestBidAddress;
    uint highestBidAmount;
  }
  mapping(address => mapping(uint => Auction)) public auctions;

  event AuctionCreated(
    address tokenAddress,
    uint tokenId,
    address seller,
    uint minBid,
    Categories category,
    uint endDate
  );

  function createAuction(
    address _tokenAddress, 
    uint _tokenId,
    uint _minBid, 
    Categories _category
  ) 
  external 
  {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate == 0, 'auction already exist'); 
    IERC721(_tokenAddress).transferFrom(msg.sender, address(this), _tokenId);
    auction.seller = msg.sender; 
    auction.minBid = _minBid; 
    auction.category = _category; 
    auction.endDate = block.timestamp + 7 * 86400; 
    auction.highestBidAddress = address(0);
    auction.highestBidAmount = 0;

    emit AuctionCreated({
      tokenAddress: _tokenAddress,
      tokenId: _tokenId,
      seller: msg.sender, 
      minBid: _minBid, 
      category: _category, 
      endDate: block.timestamp + 7 * 86400
    });
  }

  function createBid(address _tokenAddress, uint _tokenId) external payable {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate != 0, 'auction does not exist');
    require(auction.endDate >= block.timestamp, 'auction is finished');
    require(
      auction.highestBidAmount < msg.value && auction.minBid < msg.value, 
      'bid amount is too low'
    );
    //reimburse previous bidder
    auction.highestBidAddress.transfer(auction.highestBidAmount);
    auction.highestBidAddress = msg.sender;
    auction.highestBidAmount = msg.value; 
  }

  function closeBid(address _tokenAddress, uint _tokenId) external {
    Auction storage auction = auctions[_tokenAddress][_tokenId];
    require(auction.endDate != 0, 'auction does not exist');
    require(auction.endDate < block.timestamp, 'auction is not finished');
    if(auction.highestBidAmount == 0) {
      //auction failed, no bidder showed up.
      IERC721(_tokenAddress).transferFrom(address(this), auction.seller, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    } else {
      //auction succeeded, send money to seller, and token to buyer
      auction.seller.transfer(auction.highestBidAmount);
      IERC721(_tokenAddress).transferFrom(address(this), auction.highestBidAddress, _tokenId);
      delete auctions[_tokenAddress][_tokenId];
    }
  }
}
