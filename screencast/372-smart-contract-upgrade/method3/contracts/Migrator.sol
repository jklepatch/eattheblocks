pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Migrator {
  mapping(address => bool) public migrations;
  IERC20 public v1;
  IERC20 public v2;

  constructor(address _v1, address _v2) {
    v1 = IERC20(_v1);
    v2 = IERC20(_v2);
  }

  function migrate() external {
    require(migrations[msg.sender] == false, 'migration already done');
    migrations[msg.sender] = true; 
    v2.transfer(msg.sender, v1.balanceOf(msg.sender));
  }
}
