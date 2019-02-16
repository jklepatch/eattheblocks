pragma solidity ^0.5.0;


contract MyContract {
  function add(uint a, uint b) pure external returns(uint) {
    return a + b;
  }
}
