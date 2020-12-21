pragma solidity ^0.7.3;

import '@openzeppelin/contracts/tokens/ERC20/IERC20.sol';

contract MyContract {
  IERC20 public dai;
  balances(address => uint) public balances;

  constructor(address _dai) {
    dai = IERC20(_dai);
  }

  function deposit(uint amount) external {
    dai.transferFrom(msg.sender, address(this), amount);
  }

  function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount, 'amount too big');
    dai.transfer(msg.sender, amount);
  }

  //@todo Create and destroy a vault
}
