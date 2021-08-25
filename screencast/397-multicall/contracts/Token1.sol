pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token1 is ERC20 {
  constructor() ERC20('Token 1', 'TK1') {
    _mint(msg.sender, 1000);
  }
}
