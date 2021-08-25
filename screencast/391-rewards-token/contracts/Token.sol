pragma solidity ^0.8.0;

import './yields-utils-v2/token/ERC20Rewards.sol';
import './yields-utils-v2/token/ERC20.sol';

contract Token is ERC20Rewards {
  constructor(address rewardsToken) 
  ERC20Rewards('Our Reward Token', 'RWT', 18, IERC20(rewardsToken)) {
    _mint(msg.sender, 1000);
  }
}
