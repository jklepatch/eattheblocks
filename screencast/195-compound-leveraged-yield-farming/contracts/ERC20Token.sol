pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Token {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
}
