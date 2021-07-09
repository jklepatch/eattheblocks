pragma solidity ^0.8.6;

import './IImplementation.sol';

contract V2 is IImplementation {
  function getData() override external pure returns(uint) {
    return 100;
  }
}
