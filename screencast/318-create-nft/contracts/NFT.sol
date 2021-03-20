pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract NFT is ERC721 {
  uint public nextTokenId;
  address public admin;

  constructor() ERC721('My NFT', 'NFT') {
    admin = msg.sender;
  }

  function mint(address to) external {
    require(msg.sender == admin, 'only admin');
    _safeMint(to, nextTokenId);
    nextTokenId++;
  }

  function _baseURI() internal view override returns (string memory) {
    return '';
  }

}
