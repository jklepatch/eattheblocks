pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract V1 is ERC20 {
  constructor() ERC20('Token V1', 'TV1') {
    _mint(msg.sender, 1000000);
  }
}
