pragma solidity ^0.8.4;

contract ContractA {
  address public admin ;

  constructor(address _admin) {
    admin = _admin;
  }
}
