pragma solidity ^0.8.6;

contract SimpleStorage {
  uint public data;

  function setData(uint _data) external {
    data = _data;
  }
}
