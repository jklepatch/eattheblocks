pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract ERC1155OpenZeppelin is ERC1155 {
  constructor() ERC1155('http://baseUrlToMetadata') {}
}
