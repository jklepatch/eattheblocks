pragma solidity ^0.8.6;

import './IImplementation.sol';

contract V1 is IImplementation {
  function getData() override external pure returns(uint) {
    return 10;
  }
}
