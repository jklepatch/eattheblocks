pragma solidity ^0.5.0;

contract Storage {
  uint public data;

  function set(uint _data) external {
    data = _data;
  }
}
