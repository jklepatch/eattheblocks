pragma solidity ^0.8.0;

import './yields-utils-v2/token/ERC20.sol';

contract Reward is ERC20 {
  constructor() 
  ERC20('Our Reward Token', 'RWT', 18) {
    _mint(msg.sender, 1000);
  }
}
