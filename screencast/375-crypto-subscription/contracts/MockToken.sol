pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MockToken is ERC20 {
  constructor() ERC20('MockToken', 'TKN') {
    _mint(msg.sender, 1000);
  }
}
