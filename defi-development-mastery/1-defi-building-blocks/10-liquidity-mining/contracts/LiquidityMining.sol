pragma solidity ^0.7.2;

import './LpToken.sol';
import './BonusToken.sol';

contract LiquidityMining {
  struct User {
    uint balance;
    uint checkpoint;
  }
  mapping(address => User) public users;
  uint public totalBalance;
  uint public checkpoint;
  uint constant public BONUS_PER_BLOCK = 1000;
  LpToken public lpToken;
  BonusToken public bonusToken;

  constructor(address _lpToken, address _bonusToken) {
    lpToken = LpToken(_lpToken);
    bonusToken = BonusToken(_bonusToken);
  }

  function deposit(uint amount) external {
    User storage user = users[msg.sender]; 
    _updateBonusTokens(user);
    lpToken.transferFrom(msg.sender, address(this), amount);
    user.balance += amount;
    totalBalance += amount;
  }

  function withdraw(uint amount) external {
    User storage user = users[msg.sender]; 
    _updateBonusTokens(user);
    lpToken.transfer(msg.sender, amount);
    user.balance -= amount;
    totalBalance -= amount;
  }

  function _updateBonusTokens(User storage user) internal {
    uint mintableBonusTokens = (block.number - checkpoint) * BONUS_PER_BLOCK;
    if(block.number > checkpoint) {
      bonusToken.mint(address(this), mintableBonusTokens);
      checkpoint = block.number;
    }
    if(block.number > user.checkpoint) {
      bonusToken.transfer(msg.sender, mintableBonusTokens * user.balance / totalBalance);
      user.checkpoint = block.number;
    }
  }
}
