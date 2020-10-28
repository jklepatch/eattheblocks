pragma solidity ^0.7.4;

contract MyContract {
  uint public data;

  function setDate(uint _data) external {
    data = _data;
  }
}
