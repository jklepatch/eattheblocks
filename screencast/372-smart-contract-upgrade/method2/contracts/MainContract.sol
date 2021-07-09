pragma solidity ^0.8.6;

import './IImplementation.sol';

contract MainContract {
  address public admin;
  IImplementation public implementation;

  constructor() {
    admin = msg.sender;
  }

  function upgrade(address _implementation) external {
    require(msg.sender == admin, 'only admin');
    implementation = IImplementation(_implementation);
  }

  function getData() external view returns(uint) {
    return implementation.getData();
  }
}
