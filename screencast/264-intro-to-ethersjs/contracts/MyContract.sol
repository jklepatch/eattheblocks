pragma solidity ^0.7.5;

contract MyContract {
  uint public data;

  function setData(uint _data) external {
    data = _data;
  }
}
