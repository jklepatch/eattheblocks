pragma solidity ^0.4.23;

contract Storage {
  string public data;

  function setData(string _data) external {
    data = _data;
  }
}
