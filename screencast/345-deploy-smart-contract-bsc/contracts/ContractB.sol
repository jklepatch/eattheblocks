pragma solidity ^0.8.4;

contract ContractB {
  address public admin ;
  address public contractB;

  constructor(address _admin, address _contractB) {
    admin = _admin;
    contractB = _contractB;
  }
}
