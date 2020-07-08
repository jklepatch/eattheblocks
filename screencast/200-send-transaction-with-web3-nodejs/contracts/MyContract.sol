pragma solidity ^0.5.0;

contract MyContract {
  uint public data;

  function setData(uint _data) external {
    data = _data;
  }
}
