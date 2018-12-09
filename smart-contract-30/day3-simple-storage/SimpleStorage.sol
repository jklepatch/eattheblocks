pragma solidity ^0.5.0;

contract SimpleStorage {
  string data;

  function set(string _data) public {
    data = _data;
  }

  function get() view public returns(string) {
    return data;
  }
}
