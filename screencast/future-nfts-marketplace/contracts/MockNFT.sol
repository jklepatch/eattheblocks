// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract MockNFT is ERC721 {
  constructor(
    string memory name, 
    string memory symbol
  ) 
  ERC721(name, symbol) 
  {}

  function mint(address to, uint tokenId) external {
    _mint(to, tokenId);
  }
}
