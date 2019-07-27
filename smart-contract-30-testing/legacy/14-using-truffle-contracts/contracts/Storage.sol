pragma solidity ^0.5.0;

contract Storage {
  string data;
  function set(string memory _data) public {
    data = _data;
  }
}
